// ============================================
// Zito Web App - Authentication Module
// ============================================

// 에러 메시지 변환
function getErrorMessage(errorCode) {
    const messages = {
        'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
        'auth/invalid-email': '올바른 이메일 형식이 아닙니다.',
        'auth/operation-not-allowed': '이메일/비밀번호 로그인이 비활성화되어 있습니다.',
        'auth/weak-password': '비밀번호는 6자 이상이어야 합니다.',
        'auth/user-disabled': '비활성화된 계정입니다.',
        'auth/user-not-found': '등록되지 않은 이메일입니다.',
        'auth/wrong-password': '비밀번호가 일치하지 않습니다.',
        'auth/invalid-credential': '이메일 또는 비밀번호가 올바르지 않습니다.',
        'auth/too-many-requests': '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.',
        'auth/popup-closed-by-user': '로그인 창이 닫혔습니다.',
        'auth/cancelled-popup-request': '이전 로그인 요청이 취소되었습니다.',
        'auth/network-request-failed': '네트워크 연결을 확인해주세요.',
    };
    return messages[errorCode] || '오류가 발생했습니다. 다시 시도해주세요.';
}

// Firestore에서 사용자 정보 가져오기
async function getUserFromFirestore(uid) {
    if (!db) return null;
    try {
        const doc = await db.collection('users').doc(uid).get();
        if (doc.exists) {
            return doc.data();
        }
        return null;
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
}

// Firestore에 사용자 정보 저장
async function saveUserToFirestore(uid, email, name, provider) {
    if (!db) return;
    
    const userRef = db.collection('users').doc(uid);
    
    try {
        const doc = await userRef.get();
        
        if (doc.exists) {
            // 기존 사용자 - 업데이트
            await userRef.update({
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } else {
            // 신규 사용자 - 생성
            await userRef.set({
                uid: uid,
                email: email,
                name: name,
                provider: provider,
                plan: 'FREE',
                role: 'USER',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
    } catch (error) {
        console.error('Error saving user:', error);
    }
}

// 이메일 로그인
async function signInWithEmail(email, password) {
    try {
        const result = await auth.signInWithEmailAndPassword(email, password);
        console.log('✅ 로그인 성공:', result.user.email);
        return { success: true, user: result.user };
    } catch (error) {
        console.error('❌ 로그인 실패:', error);
        return { success: false, error: getErrorMessage(error.code) };
    }
}

// 이메일 회원가입
async function signUpWithEmail(name, email, password) {
    try {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        const user = result.user;
        
        // Firestore에 사용자 정보 저장
        await saveUserToFirestore(user.uid, email, name, 'email');
        
        console.log('✅ 회원가입 성공:', email);
        return { success: true, user: user };
    } catch (error) {
        console.error('❌ 회원가입 실패:', error);
        return { success: false, error: getErrorMessage(error.code) };
    }
}

// Google 로그인
async function signInWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);
        const user = result.user;
        
        // Firestore에 사용자 정보 저장
        await saveUserToFirestore(
            user.uid, 
            user.email || '', 
            user.displayName || 'Google 사용자', 
            'google'
        );
        
        console.log('✅ Google 로그인 성공:', user.email);
        return { success: true, user: user };
    } catch (error) {
        console.error('❌ Google 로그인 실패:', error);
        return { success: false, error: getErrorMessage(error.code) };
    }
}

// Apple 로그인
async function signInWithApple() {
    try {
        const provider = new firebase.auth.OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        
        const result = await auth.signInWithPopup(provider);
        const user = result.user;
        
        // Firestore에 사용자 정보 저장
        await saveUserToFirestore(
            user.uid, 
            user.email || '', 
            user.displayName || 'Apple 사용자', 
            'apple'
        );
        
        console.log('✅ Apple 로그인 성공:', user.uid);
        return { success: true, user: user };
    } catch (error) {
        console.error('❌ Apple 로그인 실패:', error);
        return { success: false, error: getErrorMessage(error.code) };
    }
}

// 로그아웃
async function signOut() {
    try {
        await auth.signOut();
        console.log('✅ 로그아웃 성공');
        window.location.href = '/';
    } catch (error) {
        console.error('❌ 로그아웃 실패:', error);
    }
}

// 인증 상태 변경 리스너
function setupAuthStateListener() {
    if (!auth) {
        console.warn('Firebase Auth not initialized');
        return;
    }
    
    auth.onAuthStateChanged(async (user) => {
        const authButtons = document.getElementById('auth-buttons');
        const userMenu = document.getElementById('user-menu');
        const dashboardBtn = document.getElementById('dashboard-btn');
        const mobileAuth = document.getElementById('mobile-auth');
        
        if (user) {
            // 로그인 상태
            console.log('User logged in:', user.email);
            
            // Firestore에서 사용자 정보 가져오기
            const userDoc = await getUserFromFirestore(user.uid);
            const userPlan = userDoc?.plan || 'FREE';
            
            // UI 업데이트
            if (authButtons) {
                authButtons.classList.add('hidden');
                authButtons.classList.remove('flex');
            }
            if (userMenu) {
                userMenu.classList.remove('hidden');
                userMenu.classList.add('flex');
            }
            
            // PRO 또는 B2B 플랜이면 대시보드 버튼 표시
            if (dashboardBtn) {
                if (userPlan === 'PRO' || userPlan === 'B2B') {
                    dashboardBtn.classList.remove('hidden');
                } else {
                    dashboardBtn.classList.add('hidden');
                }
            }
            
            // 모바일 메뉴 업데이트
            if (mobileAuth) {
                let mobileHtml = '';
                if (userPlan === 'PRO' || userPlan === 'B2B') {
                    mobileHtml += '<a href="/dashboard.html" class="block text-gray-300 hover:text-white py-2">대시보드</a>';
                }
                mobileHtml += '<button onclick="signOut()" class="block text-gray-300 hover:text-white py-2 w-full text-left">로그아웃</button>';
                mobileAuth.innerHTML = mobileHtml;
            }
            
            // 로그인/회원가입 페이지에서 홈으로 리다이렉트
            const currentPath = window.location.pathname;
            if (currentPath === '/login.html' || currentPath === '/signup.html') {
                window.location.href = '/';
            }
        } else {
            // 로그아웃 상태
            console.log('User logged out');
            
            if (authButtons) {
                authButtons.classList.remove('hidden');
                authButtons.classList.add('flex');
            }
            if (userMenu) {
                userMenu.classList.add('hidden');
                userMenu.classList.remove('flex');
            }
            if (dashboardBtn) {
                dashboardBtn.classList.add('hidden');
            }
            
            // 모바일 메뉴 업데이트
            if (mobileAuth) {
                mobileAuth.innerHTML = `
                    <a href="/login.html" class="block text-gray-300 hover:text-white py-2">로그인</a>
                    <a href="/signup.html" class="block text-gray-300 hover:text-white py-2">회원가입</a>
                `;
            }
            
            // 대시보드 페이지에서 로그인 필요
            if (window.location.pathname === '/dashboard.html') {
                window.location.href = '/login.html';
            }
        }
    });
}

// 로그아웃 버튼 이벤트 리스너 설정
function setupLogoutButton() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', signOut);
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    // Firebase 초기화 대기 후 인증 상태 리스너 설정
    setTimeout(() => {
        setupAuthStateListener();
        setupLogoutButton();
    }, 500);
});

// 전역 함수로 노출
window.signOut = signOut;
window.signInWithGoogle = signInWithGoogle;
window.signInWithApple = signInWithApple;
