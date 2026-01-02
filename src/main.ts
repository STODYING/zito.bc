// Zito 메인 웹사이트 - SPA 엔트리 포인트
import { router } from './utils/router';
import { appState } from './utils/state';
import { onAuthChange, getUserData } from './services/firebase';
import { renderHeader, initHeaderEvents } from './components/Header';
import { renderFooter } from './components/Footer';
import { renderHomePage } from './pages/Home';
import { renderLoginPage, initLoginEvents } from './pages/Login';
import { renderSignupPage, initSignupEvents } from './pages/Signup';
import { renderFreePlanPage, renderProPlanPage, renderB2BPlanPage } from './pages/Plans';
import { renderInquiryPage, initInquiryEvents } from './pages/Inquiry';
import { renderStorePage } from './pages/Store';
import { renderDashboardPage } from './pages/Dashboard';

const app = document.getElementById('app')!;

// 페이지 렌더링 함수
function renderPage(content: string, initEvents?: () => void): void {
    app.innerHTML = `
        ${renderHeader()}
        <div class="page-transition">
            ${content}
        </div>
        ${renderFooter()}
    `;
    
    // 헤더 이벤트 초기화
    initHeaderEvents();
    
    // 페이지별 이벤트 초기화
    if (initEvents) {
        initEvents();
    }
}

// 로딩 화면
function renderLoading(): void {
    app.innerHTML = `
        <div class="min-h-screen flex items-center justify-center">
            <div class="text-center">
                <div class="spinner mx-auto mb-4" style="width: 40px; height: 40px;"></div>
                <p class="text-zito-gray">로딩 중...</p>
            </div>
        </div>
    `;
}

// 라우트 설정
function setupRoutes(): void {
    // 홈
    router.addRoute('/', () => {
        renderPage(renderHomePage());
    });

    // 로그인
    router.addRoute('/login', () => {
        const state = appState.getState();
        if (state.isLoggedIn) {
            router.navigate('/');
            return;
        }
        renderPage(renderLoginPage(), initLoginEvents);
    });

    // 회원가입
    router.addRoute('/signup', () => {
        const state = appState.getState();
        if (state.isLoggedIn) {
            router.navigate('/');
            return;
        }
        renderPage(renderSignupPage(), initSignupEvents);
    });

    // 플랜 페이지들
    router.addRoute('/plan/free', () => {
        renderPage(renderFreePlanPage());
    });

    router.addRoute('/plan/pro', () => {
        renderPage(renderProPlanPage());
    });

    router.addRoute('/plan/b2b', () => {
        renderPage(renderB2BPlanPage());
    });

    // 도입문의
    router.addRoute('/inquiry', () => {
        renderPage(renderInquiryPage(), initInquiryEvents);
    });

    // 스토어
    router.addRoute('/store', () => {
        renderPage(renderStorePage());
    });

    // 대시보드 (PRO/B2B 전용)
    router.addRoute('/dashboard', () => {
        const state = appState.getState();
        if (!state.isLoggedIn) {
            router.navigate('/login');
            return;
        }
        renderPage(renderDashboardPage());
    });

    // 기본 라우트 (404)
    router.setDefault(() => {
        renderPage(`
            <main class="pt-16 min-h-screen flex items-center justify-center">
                <div class="text-center">
                    <h1 class="text-6xl font-bold text-zito-black mb-4">404</h1>
                    <p class="text-xl text-zito-gray mb-8">페이지를 찾을 수 없습니다</p>
                    <a href="/" data-link class="inline-block px-6 py-3 bg-zito-black text-white font-semibold rounded-xl hover:bg-gray-800 transition">
                        홈으로 돌아가기
                    </a>
                </div>
            </main>
        `);
    });
}

// 인증 상태 감지 및 초기화
function initAuth(): void {
    renderLoading();

    onAuthChange(async (user) => {
        if (user) {
            const userData = await getUserData(user.uid);
            appState.setState({
                user,
                userData,
                isLoggedIn: true,
                isLoading: false
            });
        } else {
            appState.setState({
                user: null,
                userData: null,
                isLoggedIn: false,
                isLoading: false
            });
        }
        
        // 현재 라우트 다시 렌더링
        router.handleRoute();
    });
}

// 상태 변경 시 헤더 업데이트 (전체 페이지가 아닌 필요한 부분만)
appState.subscribe((state) => {
    if (!state.isLoading) {
        // 현재 페이지 다시 렌더링
        router.handleRoute();
    }
});

// 앱 초기화
function init(): void {
    setupRoutes();
    initAuth();
    router.init();
}

// DOM 로드 후 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
