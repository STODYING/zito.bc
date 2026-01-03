// ============================================
// Zito Web App - Signup Page Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // 폼 요소
    const signupForm = document.getElementById('signup-form');
    const nameInput = document.getElementById('signup-name');
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');
    const confirmPasswordInput = document.getElementById('signup-confirm-password');
    const submitBtn = document.getElementById('signup-submit-btn');
    const errorEl = document.getElementById('signup-error');
    const successEl = document.getElementById('signup-success');
    
    // SNS 로그인 버튼
    const googleSignupBtn = document.getElementById('google-signup-btn');
    const appleSignupBtn = document.getElementById('apple-signup-btn');

    // 에러 표시 함수
    function showError(message) {
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.remove('hidden');
        }
        if (successEl) {
            successEl.classList.add('hidden');
        }
    }

    // 성공 표시 함수
    function showSuccess(message) {
        if (successEl) {
            successEl.textContent = message;
            successEl.classList.remove('hidden');
        }
        if (errorEl) {
            errorEl.classList.add('hidden');
        }
    }

    // 메시지 숨기기 함수
    function hideMessages() {
        if (errorEl) {
            errorEl.classList.add('hidden');
        }
        if (successEl) {
            successEl.classList.add('hidden');
        }
    }

    // 버튼 로딩 상태
    function setLoading(isLoading) {
        if (submitBtn) {
            submitBtn.disabled = isLoading;
            submitBtn.textContent = isLoading ? '가입 중...' : '가입하기';
        }
    }

    // 회원가입 폼 제출
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideMessages();
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            // 유효성 검사
            if (!name) {
                showError('이름을 입력해주세요.');
                return;
            }
            
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
            
            if (password.length < 6) {
                showError('비밀번호는 6자 이상이어야 합니다.');
                return;
            }
            
            if (password !== confirmPassword) {
                showError('비밀번호가 일치하지 않습니다.');
                return;
            }
            
            setLoading(true);
            
            try {
                const result = await signUpWithEmail(name, email, password);
                
                if (result.success) {
                    showSuccess('회원가입이 완료되었습니다! 잠시 후 이동합니다...');
                    // 성공 시 auth.js의 onAuthStateChanged에서 리다이렉트 처리
                } else {
                    showError(result.error);
                    setLoading(false);
                }
            } catch (error) {
                showError('회원가입 중 오류가 발생했습니다.');
                setLoading(false);
            }
        });
    }

    // Google 회원가입
    if (googleSignupBtn) {
        googleSignupBtn.addEventListener('click', async () => {
            hideMessages();
            
            try {
                const result = await signInWithGoogle();
                
                if (!result.success) {
                    showError(result.error);
                }
            } catch (error) {
                showError('Google 회원가입 중 오류가 발생했습니다.');
            }
        });
    }

    // Apple 회원가입
    if (appleSignupBtn) {
        appleSignupBtn.addEventListener('click', async () => {
            hideMessages();
            
            try {
                const result = await signInWithApple();
                
                if (!result.success) {
                    showError(result.error);
                }
            } catch (error) {
                showError('Apple 회원가입 중 오류가 발생했습니다.');
            }
        });
    }
});
