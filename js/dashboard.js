// ============================================
// Zito Web App - Dashboard Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Firebase 초기화 대기
    setTimeout(() => {
        setupDashboard();
    }, 1000);
});

async function setupDashboard() {
    // 인증 확인
    if (!auth) {
        console.warn('Firebase Auth not initialized');
        return;
    }
    
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            // Firestore에서 사용자 정보 가져오기
            const userDoc = await getUserFromFirestore(user.uid);
            updateDashboardUI(user, userDoc);
        } else {
            // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
            window.location.href = '/login.html';
        }
    });
}

function updateDashboardUI(user, userDoc) {
    const plan = userDoc?.plan || 'FREE';
    const userName = userDoc?.name || user.displayName || '사용자';
    
    // 현재 플랜 표시
    const currentPlanEl = document.getElementById('current-plan');
    if (currentPlanEl) {
        currentPlanEl.textContent = plan;
    }
    
    // 플랜 배경색 업데이트
    const planInfoEl = document.getElementById('user-plan-info');
    if (planInfoEl) {
        if (plan === 'PRO') {
            planInfoEl.className = 'bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 mb-8 text-white';
        } else if (plan === 'B2B') {
            planInfoEl.className = 'bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 mb-8 text-white';
        }
    }
    
    // 사용자 이름 표시
    const cardUserName = document.getElementById('card-user-name');
    if (cardUserName) {
        cardUserName.textContent = userName;
    }
    
    // PRO/B2B 전용 기능 표시
    if (plan === 'PRO' || plan === 'B2B') {
        // 추가 명함 슬롯 표시
        const proCardSlots = document.getElementById('pro-card-slots');
        if (proCardSlots) proCardSlots.classList.remove('hidden');
        
        // 무료 플랜 안내 숨기기
        const freePlanNotice = document.getElementById('free-plan-notice');
        if (freePlanNotice) freePlanNotice.classList.add('hidden');
        
        // 팔로업 기능 활성화
        const followupRequired = document.getElementById('followup-pro-required');
        const followupList = document.getElementById('followup-list');
        if (followupRequired) followupRequired.classList.add('hidden');
        if (followupList) {
            followupList.classList.remove('hidden');
            followupList.innerHTML = `
                <div class="p-3 bg-blue-50 rounded-xl">
                    <p class="text-sm text-blue-800">
                        <i class="fas fa-clock mr-2"></i>
                        아직 설정된 팔로업 알림이 없습니다
                    </p>
                </div>
            `;
        }
        
        // 업그레이드 버튼 숨기기 (B2B)
        if (plan === 'B2B') {
            const upgradeBtn = document.getElementById('upgrade-btn');
            if (upgradeBtn) upgradeBtn.classList.add('hidden');
        }
    }
    
    // 통계 로드 (데모 데이터)
    loadDashboardStats(user.uid);
}

async function loadDashboardStats(uid) {
    // 실제 구현 시 Firestore에서 통계 데이터 로드
    // 여기서는 데모 데이터 사용
    
    const totalViewsEl = document.getElementById('total-views');
    const savedCardsEl = document.getElementById('saved-cards');
    const shareCountEl = document.getElementById('share-count');
    const linkClicksEl = document.getElementById('link-clicks');
    
    // 애니메이션으로 숫자 증가
    if (totalViewsEl) animateNumber(totalViewsEl, 0, 127, 1000);
    if (savedCardsEl) animateNumber(savedCardsEl, 0, 23, 800);
    if (shareCountEl) animateNumber(shareCountEl, 0, 45, 900);
    if (linkClicksEl) animateNumber(linkClicksEl, 0, 89, 1100);
}

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        const current = Math.round(start + range * easeProgress);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}
