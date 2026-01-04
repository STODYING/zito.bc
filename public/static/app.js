// ============================================
// Zito Web App - Firebase Authentication
// ============================================

const firebaseConfig = {
  apiKey: "process.env.REACT_APP_FIREBASE_API_KEY",
  authDomain: "process.env.REACT_APP_FIREBASE_AUTH_DOMAIN",
  projectId: "process.env.REACT_APP_FIREBASE_PROJECT_ID",
  storageBucket: "process.env.REACT_APP_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
  appId: "process.env.REACT_APP_FIREBASE_APP_ID"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("✅ Firebase Initialized with injected keys");
}

const auth = firebase.auth();
const db = firebase.firestore();
    
    // 인증 상태 변경 리스너
    auth.onAuthStateChanged(handleAuthStateChange);
  } else {
    console.warn('Firebase SDK not loaded');
  }
}

// ============================================
// 인증 상태 관리
// ============================================

async function handleAuthStateChange(user) {
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
    const userRole = userDoc?.role || 'USER';
    
    // UI 업데이트
    if (authButtons) authButtons.classList.add('hidden');
    if (userMenu) userMenu.classList.remove('hidden');
    if (userMenu) userMenu.classList.add('flex');
    
    // PRO 또는 B2B 플랜이면 대시보드 버튼 표시
    if (userPlan === 'PRO' || userPlan === 'B2B' || userRole === 'ADMIN') {
      if (dashboardBtn) dashboardBtn.classList.remove('hidden');
    }
    
    // 대시보드 페이지 업데이트
    updateDashboard(user, userDoc);
    
    // 모바일 메뉴 업데이트
    if (mobileAuth) {
      mobileAuth.innerHTML = `
        ${(userPlan === 'PRO' || userPlan === 'B2B') ? '<a href="/dashboard" class="block text-gray-300 hover:text-white py-2">대시보드</a>' : ''}
        <button onclick="signOut()" class="block text-gray-300 hover:text-white py-2 w-full text-left">로그아웃</button>
      `;
    }
    
    // 로그인/회원가입 페이지에서 홈으로 리다이렉트
    if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
      window.location.href = '/';
    }
  } else {
    // 로그아웃 상태
    console.log('User logged out');
    
    if (authButtons) authButtons.classList.remove('hidden');
    if (userMenu) userMenu.classList.add('hidden');
    if (userMenu) userMenu.classList.remove('flex');
    if (dashboardBtn) dashboardBtn.classList.add('hidden');
    
    // 모바일 메뉴 업데이트
    if (mobileAuth) {
      mobileAuth.innerHTML = `
        <a href="/login" class="block text-gray-300 hover:text-white py-2">로그인</a>
        <a href="/signup" class="block text-gray-300 hover:text-white py-2">회원가입</a>
      `;
    }
    
    // 대시보드 페이지에서 로그인 필요
    if (window.location.pathname === '/dashboard') {
      window.location.href = '/login';
    }
  }
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

// ============================================
// 이메일 로그인/회원가입
// ============================================

// 이메일 로그인
async function signInWithEmail(email, password) {
  try {
    const result = await auth.signInWithEmailAndPassword(email, password);
    console.log('Login successful:', result.user.email);
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: getErrorMessage(error.code) };
  }
}

// 이메일 회원가입
async function signUpWithEmail(name, email, password) {
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    const user = result.user;
    
    // Firestore에 사용자 정보 저장
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
    
    console.log('Signup successful:', email);
    return { success: true };
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, error: getErrorMessage(error.code) };
  }
}

// ============================================
// 소셜 로그인
// ============================================

// Google 로그인
async function signInWithGoogle() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    const user = result.user;
    
    // Firestore에 사용자 정보 저장/업데이트
    await saveUserToFirestore(user, 'google');
    
    console.log('Google login successful:', user.email);
    return { success: true };
  } catch (error) {
    console.error('Google login error:', error);
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
    
    // Firestore에 사용자 정보 저장/업데이트
    await saveUserToFirestore(user, 'apple');
    
    console.log('Apple login successful:', user.uid);
    return { success: true };
  } catch (error) {
    console.error('Apple login error:', error);
    return { success: false, error: getErrorMessage(error.code) };
  }
}

// Firestore에 사용자 정보 저장
async function saveUserToFirestore(user, provider) {
  if (!db) return;
  
  const userRef = db.collection('users').doc(user.uid);
  const doc = await userRef.get();
  
  if (doc.exists) {
    // 기존 사용자 - 업데이트
    await userRef.update({
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } else {
    // 신규 사용자 - 생성
    await userRef.set({
      uid: user.uid,
      email: user.email || '',
      name: user.displayName || `${provider} 사용자`,
      provider: provider,
      plan: 'FREE',
      role: 'USER',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
}

// ============================================
// 로그아웃
// ============================================

async function signOut() {
  try {
    await auth.signOut();
    console.log('Logout successful');
    window.location.href = '/';
  } catch (error) {
    console.error('Logout error:', error);
  }
}

// ============================================
// 대시보드 업데이트
// ============================================

function updateDashboard(user, userDoc) {
  // 대시보드 페이지가 아니면 무시
  if (window.location.pathname !== '/dashboard') return;
  
  const plan = userDoc?.plan || 'FREE';
  
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
  if (cardUserName && userDoc?.name) {
    cardUserName.textContent = userDoc.name;
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
      const upgradeBtn = planInfoEl?.querySelector('a');
      if (upgradeBtn) upgradeBtn.classList.add('hidden');
    }
  }
}

// ============================================
// 에러 메시지 변환
// ============================================

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
  };
  
  return messages[errorCode] || '오류가 발생했습니다. 다시 시도해주세요.';
}

// ============================================
// 이벤트 리스너 설정
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Firebase 초기화
  initFirebase();
  
  // 모바일 메뉴 토글
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // 로그인 폼
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const errorEl = document.getElementById('login-error');
      
      const result = await signInWithEmail(email, password);
      
      if (!result.success) {
        errorEl.textContent = result.error;
        errorEl.classList.remove('hidden');
      }
    });
  }
  
  // 회원가입 폼
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      const confirmPassword = document.getElementById('signup-confirm-password').value;
      const errorEl = document.getElementById('signup-error');
      const successEl = document.getElementById('signup-success');
      
      // 유효성 검사
      if (!name) {
        errorEl.textContent = '이름을 입력해주세요.';
        errorEl.classList.remove('hidden');
        return;
      }
      
      if (!email.includes('@')) {
        errorEl.textContent = '올바른 이메일 형식이 아닙니다.';
        errorEl.classList.remove('hidden');
        return;
      }
      
      if (password.length < 6) {
        errorEl.textContent = '비밀번호는 6자 이상이어야 합니다.';
        errorEl.classList.remove('hidden');
        return;
      }
      
      if (password !== confirmPassword) {
        errorEl.textContent = '비밀번호가 일치하지 않습니다.';
        errorEl.classList.remove('hidden');
        return;
      }
      
      const result = await signUpWithEmail(name, email, password);
      
      if (result.success) {
        successEl.textContent = '회원가입이 완료되었습니다!';
        successEl.classList.remove('hidden');
        errorEl.classList.add('hidden');
      } else {
        errorEl.textContent = result.error;
        errorEl.classList.remove('hidden');
        successEl.classList.add('hidden');
      }
    });
  }
  
  // Google 로그인 버튼
  const googleLoginBtn = document.getElementById('google-login-btn');
  const googleSignupBtn = document.getElementById('google-signup-btn');
  
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', async () => {
      const result = await signInWithGoogle();
      if (!result.success) {
        const errorEl = document.getElementById('login-error');
        if (errorEl) {
          errorEl.textContent = result.error;
          errorEl.classList.remove('hidden');
        }
      }
    });
  }
  
  if (googleSignupBtn) {
    googleSignupBtn.addEventListener('click', async () => {
      const result = await signInWithGoogle();
      if (!result.success) {
        const errorEl = document.getElementById('signup-error');
        if (errorEl) {
          errorEl.textContent = result.error;
          errorEl.classList.remove('hidden');
        }
      }
    });
  }
  
  // Apple 로그인 버튼
  const appleLoginBtn = document.getElementById('apple-login-btn');
  const appleSignupBtn = document.getElementById('apple-signup-btn');
  
  if (appleLoginBtn) {
    appleLoginBtn.addEventListener('click', async () => {
      const result = await signInWithApple();
      if (!result.success) {
        const errorEl = document.getElementById('login-error');
        if (errorEl) {
          errorEl.textContent = result.error;
          errorEl.classList.remove('hidden');
        }
      }
    });
  }
  
  if (appleSignupBtn) {
    appleSignupBtn.addEventListener('click', async () => {
      const result = await signInWithApple();
      if (!result.success) {
        const errorEl = document.getElementById('signup-error');
        if (errorEl) {
          errorEl.textContent = result.error;
          errorEl.classList.remove('hidden');
        }
      }
    });
  }
  
  // 로그아웃 버튼
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', signOut);
  }
  
  // 도입문의 폼
  const inquiryForm = document.getElementById('inquiry-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = {
        companyName: document.getElementById('company-name').value,
        contactName: document.getElementById('contact-name').value,
        email: document.getElementById('contact-email').value,
        phone: document.getElementById('contact-phone').value,
        teamSize: document.getElementById('team-size').value,
        features: Array.from(document.querySelectorAll('input[name="features"]:checked')).map(cb => cb.value),
        message: document.getElementById('inquiry-message').value,
      };
      
      try {
        const response = await fetch('/api/inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
          inquiryForm.classList.add('hidden');
          document.getElementById('inquiry-success').classList.remove('hidden');
        }
      } catch (error) {
        console.error('Inquiry submit error:', error);
        alert('문의 접수에 실패했습니다. 다시 시도해주세요.');
      }
    });
  }
});

// 전역 함수로 노출 (HTML onclick에서 사용)
window.signOut = signOut;
window.signInWithGoogle = signInWithGoogle;
window.signInWithApple = signInWithApple;
