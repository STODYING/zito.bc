const functions = require("firebase-functions/v1");
const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

// 1. 초기화 및 리전 설정
if (!admin.apps.length) {
    admin.initializeApp();
}
const REGION = "asia-northeast3";

/**
 * 시간 객체(Timestamp 또는 Date)를 밀리초 숫자로 안전하게 변환
 */
function getMillis(time) {
    if (!time) return 0;
    if (typeof time.toMillis === 'function') return time.toMillis();
    if (time instanceof Date) return time.getTime();
    if (time.seconds !== undefined) return time.seconds * 1000;
    return 0;
}

/**
 * 유저의 로컬 시간을 문자열로 변환 (로그용)
 */
function getLocalTimeString(timezone) {
    try {
        return new Intl.DateTimeFormat('ko-KR', {
            timeZone: timezone || 'Asia/Seoul',
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false
        }).format(new Date());
    } catch (e) {
        return new Date().toISOString() + " (UTC Fallback)";
    }
}

/**
 * 현재 현지 시간(시) 반환
 */
function getLocalHour(timezone) {
    try {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone || 'Asia/Seoul',
            hour: 'numeric',
            hour12: false
        });
        return parseInt(formatter.format(new Date()), 10);
    } catch (e) {
        return new Date().getUTCHours();
    }
}

/**
 * 야간 발송 제한 체크
 */
function canSendNowInTimezone(userData) {
    const timezone = userData.timezone || 'Asia/Seoul';
    const settings = userData.notificationSettings || {};
    const localHour = getLocalHour(timezone);
    const isNightTime = localHour >= 21 || localHour < 8;

    // [Policy] 야간 수신 동의가 명시적으로 true인 경우에만 야간 발송 허용
    if (isNightTime && settings.nightPush !== true) {
        console.log(`[NightCheck] User in ${timezone} is in night (${localHour}h). nightPush settings is ${settings.nightPush}. BLOCKING.`);
        return false;
    }
    return true;
}

/**
 * 유저의 읽지 않은 알림 개수 계산 (뱃지용)
 * 개인 알림(isRead == false) + 공공 알림(미읽음) 합산
 */
async function getUnreadStatus(userId) {
    try {
        // 0. 유저 설정 조회
        const userDoc = await admin.firestore().collection('users').doc(userId).get();
        const userData = userDoc.data() || {};
        const settings = userData.notificationSettings || {};

        // 1. 개인 알림 개수 (users/{userId}/notifications)
        const personalSnap = await admin.firestore().collection('users').doc(userId).collection('notifications')
            .where('isRead', '==', false).get();

        const now = admin.firestore.Timestamp.now();
        let personalCount = 0;
        personalSnap.docs.forEach(doc => {
            const data = doc.data();
            // TTL(expireAt 또는 deleteAt) 및 미래 예약 필터링
            const expiry = data.expireAt || data.deleteAt;
            if (expiry && expiry.toMillis() < now.toMillis()) return;
            if (data.date && data.date.toMillis() > now.toMillis()) return;

            // 앱 설정 필터링
            if (data.type === 'FOLLOWUP' && settings.followUp === false) return;

            personalCount++;
        });

        // 2. 공용 알림 개수 (notifications/)
        // 최근 30일 이내의 발송된 알림 중 해당 유저가 아직 읽지 않은 것
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const thirtyDaysAgoTS = admin.firestore.Timestamp.fromDate(thirtyDaysAgo);

        // 발송된 공공 알림 목록 (date 또는 createdAt 기준)
        const globalRef = admin.firestore().collection('notifications');
        const [globalByDate, globalByCreatedAt] = await Promise.all([
            globalRef.where('date', '>=', thirtyDaysAgoTS).get(),
            globalRef.where('createdAt', '>=', thirtyDaysAgoTS).get()
        ]);

        const globalDocsMap = new Map();
        [...globalByDate.docs, ...globalByCreatedAt.docs].forEach(doc => {
            const data = doc.data();
            if (data.sent === undefined || data.sent === true) {
                // TTL(expireAt 또는 deleteAt) 및 미래 예약 필터링
                const expiry = data.expireAt || data.deleteAt;
                if (expiry && expiry.toMillis() < now.toMillis()) return;
                if (data.date && data.date.toMillis() > now.toMillis()) return;

                // 앱 설정 필터링
                if (data.type === 'NOTICE' && settings.notice === false) return;
                if (data.type === 'MARKETING' && settings.marketing === false) return;

                globalDocsMap.set(doc.id, doc);
            }
        });

        // 유저가 읽은 공공 알림 기록 (users/{userId}/readGlobalNotices)
        const readGlobalSnap = await admin.firestore().collection('users').doc(userId).collection('readGlobalNotices')
            .where('readAt', '>=', thirtyDaysAgoTS)
            .get();

        const readGlobalIds = new Set(readGlobalSnap.docs.map(doc => doc.id));
        let globalUnreadCount = 0;
        globalDocsMap.forEach((doc, id) => {
            if (!readGlobalIds.has(id)) {
                globalUnreadCount++;
            }
        });

        const totalCount = personalCount + globalUnreadCount;
        console.log(`[BadgeStatus] User: ${userId}, Personal: ${personalCount}, Global: ${globalUnreadCount}, Total: ${totalCount}`);

        return { count: totalCount };
    } catch (e) {
        console.error(`[BadgeStatus] Error for ${userId}:`, e);
        return { count: 0 };
    }
}

/**
 * 메시지 전송 공통 로직
 */
async function sendNotification(token, title, body, data, userId, logTag = "[Send]") {
    if (!token) return false;

    try {
        // [SYNC] 실시간 미읽음 상태 조회
        const { count } = await getUnreadStatus(userId);
        const badgeValue = count;

        const stringifiedData = {};
        if (data) {
            Object.keys(data).forEach(key => { stringifiedData[key] = String(data[key]); });
        }
        stringifiedData['id'] = stringifiedData['id'] || `noti_${Date.now()}`;

        const message = {
            token: token,
            notification: {
                title: title || "Zito",
                body: (body || "").substring(0, 100)
            },
            data: stringifiedData,
            android: {
                priority: 'high',
                notification: {
                    channelId: 'default',
                    sound: 'default'
                }
            },
            apns: {
                headers: {
                    'apns-priority': '10',
                    'apns-push-type': 'alert'
                },
                payload: {
                    aps: {
                        alert: {
                            title: title || "Zito",
                            body: (body || "").substring(0, 100)
                        },
                        sound: 'default',
                        badge: badgeValue
                    }
                }
            }
        };

        const response = await admin.messaging().send(message);
        console.log(`${logTag} [Success] User: ${userId}, Badge: ${badgeValue}, Resp: ${response}`);
        return true;
    } catch (error) {
        console.error(`${logTag} [Error] Send failed for ${userId}:`, error);
        return false;
    }
}

/**
 * 1. 글로벌 공지사항 생성 트리거 (FCM만 전송)
 */
exports.onglobalnoticecreated = functions.region(REGION)
    .runWith({ memory: "512MB", timeoutSeconds: 540 })
    .firestore
    .document("notifications/{noticeId}")
    .onCreate(async (snapshot, context) => {
        const noticeId = context.params.noticeId;
        const notice = snapshot.data();
        const now = admin.firestore.Timestamp.now();

        // 예약된 알림인 경우 스케줄러에서 처리하도록 skip
        const targetMillis = getMillis(notice.scheduledAt || notice.date);
        if (targetMillis > now.toMillis() + 60000) {
            console.log(`[GlobalNotice] Scheduled for future. Skipping immediate FCM. ID: ${noticeId}`);
            return;
        }

        console.log(`!!! [GlobalNotice] FCM BROADCAST STARTED !!! ID: ${noticeId}`);

        try {
            const users = await admin.firestore().collection('users').get();
            let sentCount = 0;

            for (const userDoc of users.docs) {
                const userId = userDoc.id;
                const userData = userDoc.data();
                const settings = userData.notificationSettings || {};

                // 수신 거부 체크
                if (settings.notice === false) continue;

                // 야간 체크
                if (!canSendNowInTimezone(userData)) continue;

                if (userData.fcmToken) {
                    await sendNotification(
                        userData.fcmToken,
                        notice.title,
                        notice.content || notice.body,
                        { type: 'NOTICE', id: noticeId },
                        userId,
                        "[GlobalSent]"
                    );
                    sentCount++;
                }
            }

            console.log(`!!! [GlobalNotice] FCM BROADCAST FINISHED !!! Sent to ${sentCount} users.`);
            await snapshot.ref.update({ sent: true, sentAt: now });

        } catch (e) {
            console.error("!!! [GlobalNotice] BROADCAST CRITICAL ERROR !!!", e);
        }
    });

/**
 * 2. 개별 알림 트리거 (TTL 추가 및 전송)
 */
exports.onusernoticecreated = functions.region(REGION)
    .runWith({ memory: "256MB" })
    .firestore
    .document("users/{userId}/notifications/{noticeId}")
    .onCreate(async (snapshot, context) => {
        const { userId, noticeId } = context.params;
        console.log(`!!! [UserNotice] DISPATCHER STARTED !!! User: ${userId}, Noti: ${noticeId}`);

        try {
            const notice = snapshot.data();
            const now = admin.firestore.Timestamp.now();
            const type = notice.type || 'NOTICE';
            const targetMillis = getMillis(notice.scheduledAt || notice.date);

            // [TTL] 30일 후 자동 삭제 필드 추가
            const expireAt = new Date();
            expireAt.setDate(expireAt.getDate() + 30);
            const updates = { expireAt: admin.firestore.Timestamp.fromDate(expireAt) };

            // [Strategy] 시간 정밀도 필터링
            if (type === 'FOLLOW_UP') {
                if (targetMillis > now.toMillis()) {
                    console.log(`[UserNotice] Deferring FOLLOW_UP to scheduler. Target: ${new Date(targetMillis).toISOString()}`);
                    await snapshot.ref.update({ ...updates, sent: false });
                    return;
                }
            } else {
                const bufferLimit = now.toMillis() + (120 * 1000);
                if (targetMillis > bufferLimit) {
                    console.log(`[UserNotice] Deferring notice/marketing to scheduler. Target: ${new Date(targetMillis).toISOString()}`);
                    await snapshot.ref.update({ ...updates, sent: false });
                    return;
                }
            }

            const userDoc = await admin.firestore().collection('users').doc(userId).get();
            if (!userDoc.exists) return;

            const userData = userDoc.data();
            const settings = userData.notificationSettings || {};

            // 설정 체크
            const isOptOut = (type === 'FOLLOW_UP' && settings.followUp === false) ||
                (type === 'MARKETING' && settings.marketing === false) ||
                (type === 'NOTICE' && settings.notice === false);

            if (isOptOut) {
                console.log(`[UserNotice] Skipped due to opt-out: ${userId}, type: ${type}`);
                await snapshot.ref.update({ ...updates, sent: 'skipped', skipReason: 'opt-out' });
                return;
            }

            // 야간 체크
            if (!canSendNowInTimezone(userData)) {
                console.log(`[UserNotice] Night-time deferral: ${userId}`);
                await snapshot.ref.update({ ...updates, sent: false });
                return;
            }

            const ok = await sendNotification(userData.fcmToken, notice.title, notice.content || notice.body, { type, id: noticeId, cardId: notice.targetId || "" }, userId, "[UserSent]");
            if (ok) {
                await snapshot.ref.update({ ...updates, sent: true, sentAt: now, sentVia: 'trigger' });
            } else {
                await snapshot.ref.update(updates);
            }

        } catch (e) {
            console.error("!!! [UserNotice] DISPATCHER ERROR !!!", e);
        }
    });

/**
 * 3. 통합 스케줄러 (개인 및 공용 알림 처리)
 */
exports.sendScheduledNotifications = functions.region(REGION)
    .runWith({ memory: "512MB", timeoutSeconds: 300 })
    .pubsub
    .schedule("every 1 minutes")
    .onRun(async (context) => {
        const now = admin.firestore.Timestamp.now();
        console.log(`!!! [Scheduled] Starting loop at ${now.toDate().toISOString()} !!!`);

        try {
            // A. 공용 알림 스케줄링 처리
            const pendingGlobal = await admin.firestore().collection('notifications')
                .where('sent', '==', false)
                .get();

            for (const globalDoc of pendingGlobal.docs) {
                const notice = globalDoc.data();
                const targetMillis = getMillis(notice.scheduledAt || notice.date);
                if (targetMillis <= now.toMillis()) {
                    // onglobalnoticecreated 트리거가 아닌 직접 발송 로직 실행이 필요할 수 있음
                    // 여기서는 간단하게 sent: true로 업데이트하여 트리거(수정전)가 작동하게 하거나, 직접 발송 로직을 호출
                    // 여기서는 공통 FCM 발송 로직을 직접 수행하거나 트리거를 활용할 수 있도록 sent 필드를 활용함
                    // 다만 현재 onglobalnoticecreated는 onCreate이므로, 이미 문서가 있다면 작동하지 않음.
                    // 따라서 직접 발송 로직을 여기서 실행하거나 기능을 분리해야 함.
                    await broadcastGlobalNotice(globalDoc.id, notice);
                }
            }

            // B. 개인 알림 스케줄링 처리
            const users = await admin.firestore().collection('users').get();
            let totalSent = 0;

            for (const userDoc of users.docs) {
                const userId = userDoc.id;
                const userData = userDoc.data();
                const pending = await userDoc.ref.collection('notifications').where('sent', '==', false).get();

                if (pending.empty) continue;

                for (const doc of pending.docs) {
                    const noti = doc.data();
                    const targetMillis = getMillis(noti.scheduledAt || noti.date);

                    if (targetMillis <= now.toMillis()) {
                        const type = noti.type || 'NOTICE';
                        const settings = userData.notificationSettings || {};

                        const isOptOut = (type === 'FOLLOW_UP' && settings.followUp === false) ||
                            (type === 'MARKETING' && settings.marketing === false) ||
                            (type === 'NOTICE' && settings.notice === false);

                        if (isOptOut) {
                            await doc.ref.update({ sent: 'skipped', skipReason: 'opt-out' });
                            continue;
                        }

                        if (canSendNowInTimezone(userData)) {
                            const ok = await sendNotification(userData.fcmToken, noti.title, noti.content, { type, id: doc.id, cardId: noti.targetId || "" }, userId, "[ScheduledSent]");
                            if (ok) {
                                await doc.ref.update({ sent: true, sentAt: now, sentVia: 'scheduler' });
                                totalSent++;
                            }
                        }
                    }
                }
            }
            console.log(`!!! [Scheduled] Loop finished. Sent: ${totalSent} !!!`);
        } catch (e) {
            console.error("!!! [Scheduled] CRITICAL ERROR !!!", e);
        }
    });

/**
 * 공용 알림 BROADCAST 함수 (스케줄러에서도 호출 가능하도록 분리)
 */
async function broadcastGlobalNotice(noticeId, notice) {
    const now = admin.firestore.Timestamp.now();
    try {
        const users = await admin.firestore().collection('users').get();
        let sentCount = 0;
        for (const userDoc of users.docs) {
            const userId = userDoc.id;
            const userData = userDoc.data();
            const settings = userData.notificationSettings || {};
            if (settings.notice === false) continue;
            if (!canSendNowInTimezone(userData)) continue;

            if (userData.fcmToken) {
                await sendNotification(userData.fcmToken, notice.title, notice.content || notice.body, { type: 'NOTICE', id: noticeId }, userId, "[GlobalSent]");
                sentCount++;
            }
        }
        await admin.firestore().collection('notifications').doc(noticeId).update({ sent: true, sentAt: now });
        console.log(`[Broadcast] Notice ${noticeId} finished. Sent: ${sentCount}`);
    } catch (e) {
        console.error(`[Broadcast] Error for ${noticeId}:`, e);
    }
}

/**
 * 6. [SSR] 명함 뷰어 동적 OG 태그 렌더러
 * 카카오톡, 슬랙 등 자바스크립트를 실행하지 않는 크롤러를 위해 명함 데이터를 HTML에 미리 삽입하여 응답합니다.
 */
exports.renderCardViewer = functions.region(REGION).https.onRequest(async (req, res) => {
    // 1. URL Path에서 cardId 추출 (/bc/CARD_ID)
    const segments = req.path.split('/');
    const cardId = segments[segments.length - 1] || req.query.id;

    if (!cardId || cardId === 'bc') {
        return res.status(404).send("Invalid Card ID");
    }

    try {
        // 2. Firestore에서 명함 데이터 조회
        const snap = await admin.firestore().collection('publicCards').doc(cardId).get();
        if (!snap.exists) {
            return res.status(404).send("Card not found");
        }

        const data = snap.data();
        const name = data.name || "Zito 사용자";
        const title = `${name}의 명함`;
        const description = data.company
            ? `${data.company}${data.position ? ' | ' + data.position : ''}`
            : (data.subtitle || "Zito 디지털 명함을 확인하세요");

        // 이미지 우선순위: 전체명함 이미지 > 로고 > 기본 이미지
        const imageUrl = data.fullCardImageURL || data.logoImageURL || "https://zito-bc.web.app/images/default-card-og.png";
        const canonicalUrl = `https://zito-bc.web.app/bc/${cardId}`;

        // 3. HTML 템플릿 읽기
        const templatePath = path.join(__dirname, 'template.html');
        let html = fs.readFileSync(templatePath, 'utf8');

        // 4. 플레이스홀더 치환 (__OG_TITLE__, __OG_DESCRIPTION__, __OG_IMAGE__, __OG_URL__)
        html = html.replace(/__OG_TITLE__/g, title)
            .replace(/__OG_DESCRIPTION__/g, description)
            .replace(/__OG_IMAGE__/g, imageUrl)
            .replace(/__OG_URL__/g, canonicalUrl);

        // 5. 캐시 설정 (CDN 캐시 10분, 클라이언트 5분) 및 응답
        res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
        res.status(200).send(html);

    } catch (error) {
        console.error("[SSR] Rendering Error:", error);
        res.status(500).send("Internal Server Error");
    }
});
