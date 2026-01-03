// ==========================================
// Zito Web App - Main Application Script
// ==========================================

// Global State
let currentUser = null;
let userPlan = 'FREE'; // FREE, PRO, B2B
let userRole = 'USER'; // USER, ADMIN

// ==========================================
// Navigation Functions
// ==========================================

function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(`page-${page}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update URL hash for history
    window.location.hash = page;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Handle browser back/forward buttons
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1) || 'home';
    navigateTo(hash);
});

// Initialize page from URL hash on load
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.slice(1) || 'home';
    navigateTo(hash);
    
    // Check auth state
    if (auth) {
        auth.onAuthStateChanged(handleAuthStateChange);
    }
});

// ==========================================
// Modal Functions
// ==========================================

function openLoginModal() {
    const modal = document.getElementById('login-modal');
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('show'), 10);
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
    
    // Clear form
    document.getElementById('login-form').reset();
}

function openSignupModal() {
    const modal = document.getElementById('signup-modal');
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('show'), 10);
    document.body.style.overflow = 'hidden';
}

function closeSignupModal() {
    const modal = document.getElementById('signup-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
    
    // Clear form
    document.getElementById('signup-form').reset();
}

function switchToSignup() {
    closeLoginModal();
    setTimeout(openSignupModal, 350);
}

function switchToLogin() {
    closeSignupModal();
    setTimeout(openLoginModal, 350);
}

function showAlert(title, message, type = 'success') {
    const modal = document.getElementById('alert-modal');
    const icon = document.getElementById('alert-icon');
    const titleEl = document.getElementById('alert-title');
    const messageEl = document.getElementById('alert-message');
    
    titleEl.textContent = title;
    messageEl.textContent = message;
    
    // Set icon based on type
    icon.className = 'fas text-5xl mb-4';
    switch (type) {
        case 'success':
            icon.classList.add('fa-check-circle', 'text-green-500');
            break;
        case 'error':
            icon.classList.add('fa-exclamation-circle', 'text-red-500');
            break;
        case 'warning':
            icon.classList.add('fa-exclamation-triangle', 'text-yellow-500');
            break;
        case 'info':
            icon.classList.add('fa-info-circle', 'text-blue-500');
            break;
    }
    
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeAlertModal() {
    const modal = document.getElementById('alert-modal');
    modal.classList.remove('show');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

// ==========================================
// Authentication Functions
// ==========================================

function handleAuthStateChange(user) {
    currentUser = user;
    
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const dashboardBtn = document.getElementById('dashboard-btn');
    
    if (user) {
        // User is logged in
        loginBtn.classList.add('hidden');
        signupBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        
        // Fetch user data from Firestore
        fetchUserData(user.uid);
        
        console.log('✅ 로그인 상태:', user.email);
    } else {
        // User is logged out
        loginBtn.classList.remove('hidden');
        signupBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        dashboardBtn.classList.add('hidden');
        
        userPlan = 'FREE';
        userRole = 'USER';
        
        console.log('✅ 로그아웃 상태');
    }
}

async function fetchUserData(uid) {
    try {
        const userDoc = await db.collection('users').doc(uid).get();
        
        if (userDoc.exists) {
            const userData = userDoc.data();
            userPlan = userData.plan || 'FREE';
            userRole = userData.role || 'USER';
            
            // Show dashboard button for PRO or B2B users
            const dashboardBtn = document.getElementById('dashboard-btn');
            if (userPlan === 'PRO' || userPlan === 'B2B') {
                dashboardBtn.classList.remove('hidden');
            } else {
                dashboardBtn.classList.add('hidden');
            }
            
            // Update dashboard user info
            const dashboardUserInfo = document.getElementById('dashboard-user-info');
            if (dashboardUserInfo) {
                dashboardUserInfo.textContent = `${userData.name || currentUser.email}님, 환영합니다! (${userPlan} 플랜)`;
            }
            
            console.log('✅ 유저 데이터 로드:', userData);
        }
    } catch (error) {
        console.error('❌ 유저 데이터 로드 실패:', error);
    }
}

// Email Login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        await auth.signInWithEmailAndPassword(email, password);
        closeLoginModal();
        showAlert('로그인 성공', '환영합니다!', 'success');
    } catch (error) {
        console.error('❌ 로그인 실패:', error);
        let message = '로그인에 실패했습니다.';
        
        switch (error.code) {
            case 'auth/user-not-found':
                message = '등록되지 않은 이메일입니다.';
                break;
            case 'auth/wrong-password':
                message = '비밀번호가 올바르지 않습니다.';
                break;
            case 'auth/invalid-email':
                message = '올바른 이메일 형식이 아닙니다.';
                break;
            case 'auth/too-many-requests':
                message = '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
                break;
        }
        
        showAlert('로그인 실패', message, 'error');
    }
});

// Email Signup
document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    // Validation
    if (password !== confirmPassword) {
        showAlert('회원가입 실패', '비밀번호가 일치하지 않습니다.', 'error');
        return;
    }
    
    if (password.length < 6) {
        showAlert('회원가입 실패', '비밀번호는 6자 이상이어야 합니다.', 'error');
        return;
    }
    
    try {
        // Create user
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Save to Firestore
        await db.collection('users').doc(user.uid).set({
            uid: user.uid,
            email: email,
            name: name,
            provider: 'email',
            plan: 'FREE',
            role: 'USER',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        closeSignupModal();
        showAlert('회원가입 성공', '환영합니다! 지토와 함께 시작해보세요.', 'success');
    } catch (error) {
        console.error('❌ 회원가입 실패:', error);
        let message = '회원가입에 실패했습니다.';
        
        switch (error.code) {
            case 'auth/email-already-in-use':
                message = '이미 사용 중인 이메일입니다.';
                break;
            case 'auth/invalid-email':
                message = '올바른 이메일 형식이 아닙니다.';
                break;
            case 'auth/weak-password':
                message = '비밀번호가 너무 약합니다.';
                break;
        }
        
        showAlert('회원가입 실패', message, 'error');
    }
});

// Google Sign In
async function signInWithGoogle() {
    try {
        const result = await auth.signInWithPopup(googleProvider);
        const user = result.user;
        
        // Check if user exists in Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();
        
        if (!userDoc.exists) {
            // Create new user document
            await db.collection('users').doc(user.uid).set({
                uid: user.uid,
                email: user.email,
                name: user.displayName || 'Google 사용자',
                provider: 'google',
                plan: 'FREE',
                role: 'USER',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } else {
            // Update timestamp
            await db.collection('users').doc(user.uid).update({
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        
        closeLoginModal();
        closeSignupModal();
        showAlert('로그인 성공', '구글 계정으로 로그인되었습니다.', 'success');
    } catch (error) {
        console.error('❌ Google 로그인 실패:', error);
        
        if (error.code !== 'auth/popup-closed-by-user') {
            showAlert('로그인 실패', 'Google 로그인에 실패했습니다.', 'error');
        }
    }
}

// Apple Sign In
async function signInWithApple() {
    try {
        const result = await auth.signInWithPopup(appleProvider);
        const user = result.user;
        
        // Check if user exists in Firestore
        const userDoc = await db.collection('users').doc(user.uid).get();
        
        if (!userDoc.exists) {
            // Create new user document
            await db.collection('users').doc(user.uid).set({
                uid: user.uid,
                email: user.email || '',
                name: user.displayName || 'Apple 사용자',
                provider: 'apple',
                plan: 'FREE',
                role: 'USER',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } else {
            // Update timestamp
            await db.collection('users').doc(user.uid).update({
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        
        closeLoginModal();
        closeSignupModal();
        showAlert('로그인 성공', 'Apple 계정으로 로그인되었습니다.', 'success');
    } catch (error) {
        console.error('❌ Apple 로그인 실패:', error);
        
        if (error.code !== 'auth/popup-closed-by-user') {
            showAlert('로그인 실패', 'Apple 로그인에 실패했습니다.', 'error');
        }
    }
}

// Logout
async function handleLogout() {
    try {
        await auth.signOut();
        showAlert('로그아웃', '안전하게 로그아웃되었습니다.', 'info');
        navigateTo('home');
    } catch (error) {
        console.error('❌ 로그아웃 실패:', error);
        showAlert('오류', '로그아웃에 실패했습니다.', 'error');
    }
}

// ==========================================
// Inquiry Form
// ==========================================

document.getElementById('inquiry-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        company: document.getElementById('inquiry-company').value,
        name: document.getElementById('inquiry-name').value,
        email: document.getElementById('inquiry-email').value,
        phone: document.getElementById('inquiry-phone').value,
        size: document.getElementById('inquiry-size').value,
        message: document.getElementById('inquiry-message').value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    try {
        await db.collection('inquiries').add(formData);
        showAlert('문의 완료', '문의가 정상적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.', 'success');
        document.getElementById('inquiry-form').reset();
    } catch (error) {
        console.error('❌ 문의 저장 실패:', error);
        showAlert('오류', '문의 접수에 실패했습니다. 다시 시도해주세요.', 'error');
    }
});

// ==========================================
// Utility Functions
// ==========================================

// Close modals on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLoginModal();
        closeSignupModal();
        closeAlertModal();
    }
});

// Close modals on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeLoginModal();
            closeSignupModal();
            closeAlertModal();
        }
    });
});

console.log('✅ Zito App 초기화 완료');
