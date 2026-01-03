// ============================================
// Zito Web App - Login Page Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // 폼 요소
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const submitBtn = document.getElementById('login-submit-btn');
    const errorEl = document.getElementById('login-error');
    
    // SNS 로그인 버튼
    const googleLoginBtn = document.getElementById('google-login-btn');
    const appleLoginBtn = document.getElementById('apple-login-btn');

    // 에러 표시 함수
    function showError(message) {
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.remove('hidden');
        }
    }

    // 에러 숨기기 함수
    function hideError() {
        if (errorEl) {
            errorEl.classList.add('hidden');
        }
    }

    // 버튼 로딩 상태
    function setLoading(isLoading) {
        if (submitBtn) {
            submitBtn.disabled = isLoading;
            submitBtn.textContent = isLoading ? '로그인 중...' : '로그인';
        }
    }

    // 이메일 로그인 폼 제출
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideError();
            
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            
            // 유효성 검사
            if (!email) {
                showError('이메일을 입력해주세요.');
                return;
            }
            
            if (!email.includes('@')) {
                showError('올바른 이메일 형식이 아닙니다.');
                return;
            }
            
            if (!password) {
                showError('비밀번호를 입력해주세요.');
                return;
            }
            
            setLoading(true);
            
            try {
                const result = await signInWithEmail(email, password);
                
                if (!result.success) {
                    showError(result.error);
                    setLoading(false);
                }
                // 성공 시 auth.js의 onAuthStateChanged에서 리다이렉트 처리
            } catch (error) {
                showError('로그인 중 오류가 발생했습니다.');
                setLoading(false);
            }
        });
    }

    // Google 로그인
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', async () => {
            hideError();
            
            try {
                const result = await signInWithGoogle();
                
                if (!result.success) {
                    showError(result.error);
                }
            } catch (error) {
                showError('Google 로그인 중 오류가 발생했습니다.');
            }
        });
    }

    // Apple 로그인
    if (appleLoginBtn) {
        appleLoginBtn.addEventListener('click', async () => {
            hideError();
            
            try {
                const result = await signInWithApple();
                
                if (!result.success) {
                    showError(result.error);
                }
            } catch (error) {
                showError('Apple 로그인 중 오류가 발생했습니다.');
            }
        });
    }
});
