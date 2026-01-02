// 회원가입 페이지
import { signUpWithEmail, signInWithGoogle, signInWithApple, getUserData } from '../services/firebase';
import { appState } from '../utils/state';
import { router } from '../utils/router';

export function renderSignupPage(): string {
    return `
    <main class="pt-16 min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-4">
            <!-- 로고 -->
            <div class="text-center mb-8">
                <img src="/images/zito_logo_2.png" alt="Zito" class="h-12 mx-auto mb-4" onerror="this.outerHTML='<span class=\\'text-3xl font-bold italic\\'>Zito</span>'">
                <h1 class="text-2xl font-bold text-zito-black">회원가입</h1>
                <p class="text-zito-gray mt-2">무료로 디지털 명함을 시작하세요.</p>
            </div>

            <!-- 회원가입 폼 -->
            <form id="signup-form" class="space-y-4">
                <div>
                    <input 
                        type="text" 
                        id="signup-name" 
                        placeholder="이름"
                        class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-zito-black transition"
                        required
                    >
                </div>
                <div>
                    <input 
                        type="email" 
                        id="signup-email" 
                        placeholder="이메일"
                        class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-zito-black transition"
                        required
                    >
                </div>
                <div>
                    <input 
                        type="password" 
                        id="signup-password" 
                        placeholder="비밀번호 (6자 이상)"
                        class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-zito-black transition"
                        required
                        minlength="6"
                    >
                </div>
                <div>
                    <input 
                        type="password" 
                        id="signup-password-confirm" 
                        placeholder="비밀번호 확인"
                        class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-zito-black transition"
                        required
                    >
                </div>
                <button 
                    type="submit" 
                    id="signup-submit-btn"
                    class="w-full py-4 bg-zito-black text-white font-semibold rounded-xl hover:bg-gray-800 transition flex items-center justify-center"
                >
                    <span id="signup-btn-text">가입하기</span>
                    <div id="signup-spinner" class="spinner ml-2 hidden"></div>
                </button>
            </form>

            <!-- 에러 메시지 -->
            <div id="signup-error" class="hidden mt-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm"></div>

            <!-- 성공 메시지 -->
            <div id="signup-success" class="hidden mt-4 p-3 bg-green-100 text-green-700 rounded-xl text-sm"></div>

            <!-- 소셜 로그인 구분선 -->
            <div class="flex items-center my-6">
                <div class="flex-1 border-t border-gray-300"></div>
                <span class="px-4 text-sm text-zito-gray">SNS 회원가입</span>
                <div class="flex-1 border-t border-gray-300"></div>
            </div>

            <!-- 소셜 로그인 버튼 -->
            <div class="flex justify-center space-x-4">
                <!-- Apple 로그인 -->
                <button 
                    id="apple-signup-btn"
                    class="w-14 h-14 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition"
                    title="Apple로 가입"
                >
                    <i class="fab fa-apple text-white text-2xl"></i>
                </button>

                <!-- Google 로그인 -->
                <button 
                    id="google-signup-btn"
                    class="w-14 h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition"
                    title="Google로 가입"
                >
                    <svg class="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                </button>
            </div>

            <!-- 로그인 링크 -->
            <div class="text-center mt-8">
                <span class="text-zito-gray">이미 계정이 있으신가요? </span>
                <a href="/login" data-link class="text-zito-black font-medium underline hover:text-gray-600">
                    로그인
                </a>
            </div>
        </div>
    </main>
    `;
}

export function initSignupEvents(): void {
    const form = document.getElementById('signup-form') as HTMLFormElement;
    const nameInput = document.getElementById('signup-name') as HTMLInputElement;
    const emailInput = document.getElementById('signup-email') as HTMLInputElement;
    const passwordInput = document.getElementById('signup-password') as HTMLInputElement;
    const passwordConfirmInput = document.getElementById('signup-password-confirm') as HTMLInputElement;
    const submitBtn = document.getElementById('signup-submit-btn') as HTMLButtonElement;
    const btnText = document.getElementById('signup-btn-text') as HTMLSpanElement;
    const spinner = document.getElementById('signup-spinner') as HTMLDivElement;
    const errorDiv = document.getElementById('signup-error') as HTMLDivElement;
    const successDiv = document.getElementById('signup-success') as HTMLDivElement;
    const googleBtn = document.getElementById('google-signup-btn') as HTMLButtonElement;
    const appleBtn = document.getElementById('apple-signup-btn') as HTMLButtonElement;

    const showError = (message: string) => {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        successDiv.classList.add('hidden');
    };

    const showSuccess = (message: string) => {
        successDiv.textContent = message;
        successDiv.classList.remove('hidden');
        errorDiv.classList.add('hidden');
    };

    const hideMessages = () => {
        errorDiv.classList.add('hidden');
        successDiv.classList.add('hidden');
    };

    const setLoading = (loading: boolean) => {
        if (loading) {
            btnText.textContent = '가입 중...';
            spinner.classList.remove('hidden');
            submitBtn.disabled = true;
        } else {
            btnText.textContent = '가입하기';
            spinner.classList.add('hidden');
            submitBtn.disabled = false;
        }
    };

    const handleSignupSuccess = async (user: any) => {
        const userData = await getUserData(user.uid);
        appState.setState({ 
            user, 
            userData, 
            isLoggedIn: true, 
            isLoading: false 
        });
        router.navigate('/');
    };

    // 이메일 회원가입
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideMessages();

        // 유효성 검사
        if (!nameInput.value.trim()) {
            showError('이름을 입력해주세요.');
            return;
        }

        if (!emailInput.value.includes('@')) {
            showError('올바른 이메일 형식이 아닙니다.');
            return;
        }

        if (passwordInput.value.length < 6) {
            showError('비밀번호는 6자 이상이어야 합니다.');
            return;
        }

        if (passwordInput.value !== passwordConfirmInput.value) {
            showError('비밀번호가 일치하지 않습니다.');
            return;
        }

        setLoading(true);

        try {
            const user = await signUpWithEmail(
                nameInput.value.trim(),
                emailInput.value.trim(),
                passwordInput.value
            );
            showSuccess('회원가입이 완료되었습니다!');
            setTimeout(() => handleSignupSuccess(user), 1000);
        } catch (error: any) {
            console.error('회원가입 실패:', error);
            let errorMessage = '회원가입에 실패했습니다.';
            
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = '이미 사용 중인 이메일입니다.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = '올바른 이메일 형식이 아닙니다.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = '비밀번호가 너무 약합니다.';
            }
            
            showError(errorMessage);
        } finally {
            setLoading(false);
        }
    });

    // Google 회원가입
    googleBtn?.addEventListener('click', async () => {
        hideMessages();
        try {
            const user = await signInWithGoogle();
            await handleSignupSuccess(user);
        } catch (error: any) {
            console.error('Google 회원가입 실패:', error);
            if (error.code !== 'auth/popup-closed-by-user') {
                showError('Google 회원가입에 실패했습니다.');
            }
        }
    });

    // Apple 회원가입
    appleBtn?.addEventListener('click', async () => {
        hideMessages();
        try {
            const user = await signInWithApple();
            await handleSignupSuccess(user);
        } catch (error: any) {
            console.error('Apple 회원가입 실패:', error);
            if (error.code !== 'auth/popup-closed-by-user') {
                showError('Apple 회원가입에 실패했습니다.');
            }
        }
    });
}
