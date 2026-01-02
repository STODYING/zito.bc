// 헤더 컴포넌트
import { appState } from '../utils/state';

export function renderHeader(): string {
    const state = appState.getState();
    const { isLoggedIn, userData } = state;
    
    // PRO 또는 B2B 플랜인 경우 대시보드 메뉴 표시
    const showDashboard = isLoggedIn && userData && (userData.plan === 'PRO' || userData.plan === 'B2B');

    return `
    <header class="fixed top-0 left-0 right-0 bg-zito-black text-white z-50">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- 로고 -->
                <div class="flex items-center">
                    <a href="/" data-link class="flex items-center">
                        <img src="/images/zito_logo_2.png" alt="Zito" class="h-8" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <span class="text-2xl font-bold italic hidden">Zito</span>
                    </a>
                </div>

                <!-- 네비게이션 메뉴 - 데스크탑 -->
                <div class="hidden md:flex items-center space-x-1">
                    <!-- 플랜 드롭다운 -->
                    <div class="relative group">
                        <button class="flex items-center px-4 py-2 text-sm font-medium text-white hover:text-gray-300">
                            플랜
                            <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <div class="absolute left-0 mt-0 w-32 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <a href="/plan/free" data-link class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">무료</a>
                            <a href="/plan/pro" data-link class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">PRO</a>
                            <a href="/plan/b2b" data-link class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">B2B</a>
                        </div>
                    </div>

                    <a href="/inquiry" data-link class="px-4 py-2 text-sm font-medium text-white hover:text-gray-300">도입문의</a>
                    <a href="/store" data-link class="px-4 py-2 text-sm font-medium text-white hover:text-gray-300 underline">스토어</a>
                </div>

                <!-- 로그인/회원가입 또는 사용자 메뉴 -->
                <div class="hidden md:flex items-center space-x-4">
                    ${isLoggedIn ? `
                        ${showDashboard ? `
                            <a href="/dashboard" data-link class="px-4 py-2 text-sm font-medium text-white hover:text-gray-300">대시보드</a>
                        ` : ''}
                        <button id="logout-btn" class="px-4 py-2 text-sm font-medium text-white hover:text-gray-300">로그아웃</button>
                    ` : `
                        <a href="/login" data-link class="px-4 py-2 text-sm font-medium text-white hover:text-gray-300">로그인</a>
                        <a href="/signup" data-link class="px-4 py-2 text-sm font-medium bg-white text-zito-black rounded-lg hover:bg-gray-200">회원가입</a>
                    `}
                </div>

                <!-- 모바일 메뉴 버튼 -->
                <div class="md:hidden">
                    <button id="mobile-menu-btn" class="p-2 text-white">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- 모바일 메뉴 -->
            <div id="mobile-menu" class="hidden md:hidden pb-4">
                <div class="space-y-1">
                    <a href="/plan/free" data-link class="block px-4 py-2 text-white hover:bg-gray-800 rounded">무료</a>
                    <a href="/plan/pro" data-link class="block px-4 py-2 text-white hover:bg-gray-800 rounded">PRO</a>
                    <a href="/plan/b2b" data-link class="block px-4 py-2 text-white hover:bg-gray-800 rounded">B2B</a>
                    <a href="/inquiry" data-link class="block px-4 py-2 text-white hover:bg-gray-800 rounded">도입문의</a>
                    <a href="/store" data-link class="block px-4 py-2 text-white hover:bg-gray-800 rounded underline">스토어</a>
                    <div class="border-t border-gray-700 my-2"></div>
                    ${isLoggedIn ? `
                        ${showDashboard ? `
                            <a href="/dashboard" data-link class="block px-4 py-2 text-white hover:bg-gray-800 rounded">대시보드</a>
                        ` : ''}
                        <button id="mobile-logout-btn" class="block w-full text-left px-4 py-2 text-white hover:bg-gray-800 rounded">로그아웃</button>
                    ` : `
                        <a href="/login" data-link class="block px-4 py-2 text-white hover:bg-gray-800 rounded">로그인</a>
                        <a href="/signup" data-link class="block px-4 py-2 text-white hover:bg-gray-800 rounded">회원가입</a>
                    `}
                </div>
            </div>
        </nav>
    </header>
    `;
}

export function initHeaderEvents(): void {
    // 모바일 메뉴 토글
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn?.addEventListener('click', () => {
        mobileMenu?.classList.toggle('hidden');
    });

    // 로그아웃 버튼
    const logoutBtn = document.getElementById('logout-btn');
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
    
    const handleLogout = async () => {
        const { logOut } = await import('../services/firebase');
        try {
            await logOut();
            appState.setState({ user: null, userData: null, isLoggedIn: false });
            window.location.href = '/';
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    logoutBtn?.addEventListener('click', handleLogout);
    mobileLogoutBtn?.addEventListener('click', handleLogout);
}
