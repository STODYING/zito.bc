// 대시보드 페이지 (PRO/B2B 전용)
import { appState } from '../utils/state';

export function renderDashboardPage(): string {
    const state = appState.getState();
    const { userData } = state;

    // 접근 권한 확인
    if (!userData || (userData.plan !== 'PRO' && userData.plan !== 'B2B')) {
        return `
        <main class="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
            <div class="text-center px-4">
                <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-lock text-red-500 text-3xl"></i>
                </div>
                <h1 class="text-2xl font-bold text-zito-black mb-4">접근 권한이 없습니다</h1>
                <p class="text-zito-gray mb-8">대시보드는 PRO 또는 B2B 플랜 사용자만 이용할 수 있습니다.</p>
                <a href="/plan/pro" data-link class="inline-block px-8 py-4 bg-zito-black text-white font-semibold rounded-xl hover:bg-gray-800 transition">
                    PRO 플랜 알아보기
                </a>
            </div>
        </main>
        `;
    }

    const isPro = userData.plan === 'PRO';
    const isB2B = userData.plan === 'B2B';

    return `
    <main class="pt-16 min-h-screen bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 py-8">
            <!-- 헤더 -->
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 class="text-2xl font-bold text-zito-black">대시보드</h1>
                    <p class="text-zito-gray">안녕하세요, ${userData.name}님!</p>
                </div>
                <div class="mt-4 md:mt-0">
                    <span class="inline-block px-4 py-2 ${isB2B ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'} rounded-full text-sm font-medium">
                        ${userData.plan} 플랜
                    </span>
                </div>
            </div>

            <!-- 통계 카드 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="bg-white rounded-xl p-6 shadow-sm">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-eye text-blue-600"></i>
                        </div>
                        <span class="text-green-500 text-sm font-medium">+12%</span>
                    </div>
                    <h3 class="text-2xl font-bold">1,234</h3>
                    <p class="text-sm text-zito-gray">이번 달 조회수</p>
                </div>
                <div class="bg-white rounded-xl p-6 shadow-sm">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-exchange-alt text-green-600"></i>
                        </div>
                        <span class="text-green-500 text-sm font-medium">+8%</span>
                    </div>
                    <h3 class="text-2xl font-bold">56</h3>
                    <p class="text-sm text-zito-gray">명함 교환</p>
                </div>
                <div class="bg-white rounded-xl p-6 shadow-sm">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-mouse-pointer text-purple-600"></i>
                        </div>
                        <span class="text-red-500 text-sm font-medium">-3%</span>
                    </div>
                    <h3 class="text-2xl font-bold">89</h3>
                    <p class="text-sm text-zito-gray">링크 클릭</p>
                </div>
                <div class="bg-white rounded-xl p-6 shadow-sm">
                    <div class="flex items-center justify-between mb-4">
                        <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-address-book text-orange-600"></i>
                        </div>
                        <span class="text-green-500 text-sm font-medium">+5</span>
                    </div>
                    <h3 class="text-2xl font-bold">127</h3>
                    <p class="text-sm text-zito-gray">명함첩</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- 내 명함 -->
                <div class="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-lg font-semibold">내 명함</h2>
                        ${isPro || isB2B ? `
                            <button class="px-4 py-2 bg-zito-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
                                <i class="fas fa-plus mr-1"></i> 새 명함
                            </button>
                        ` : ''}
                    </div>
                    <div class="space-y-4">
                        <!-- 명함 1 -->
                        <div class="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer">
                            <div class="w-16 h-16 bg-zito-black rounded-lg flex items-center justify-center mr-4">
                                <span class="text-white font-bold">Z</span>
                            </div>
                            <div class="flex-1">
                                <h3 class="font-semibold">${userData.name}</h3>
                                <p class="text-sm text-zito-gray">${userData.email}</p>
                            </div>
                            <div class="text-right">
                                <p class="text-sm font-medium">243 조회</p>
                                <p class="text-xs text-zito-gray">이번 주</p>
                            </div>
                        </div>
                        ${isPro || isB2B ? `
                            <!-- 명함 2 -->
                            <div class="flex items-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer">
                                <div class="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                                    <span class="text-white font-bold">F</span>
                                </div>
                                <div class="flex-1">
                                    <h3 class="font-semibold">프리랜서 명함</h3>
                                    <p class="text-sm text-zito-gray">사이드 프로젝트용</p>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm font-medium">87 조회</p>
                                    <p class="text-xs text-zito-gray">이번 주</p>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>

                <!-- 팔로업 알림 -->
                <div class="bg-white rounded-xl p-6 shadow-sm">
                    <h2 class="text-lg font-semibold mb-6">팔로업 알림</h2>
                    <div class="space-y-4">
                        <div class="flex items-center p-3 bg-yellow-50 rounded-lg">
                            <div class="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center mr-3">
                                <i class="fas fa-bell text-yellow-600"></i>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-medium">김철수님에게 연락하세요</p>
                                <p class="text-xs text-zito-gray">3일 전 명함 교환</p>
                            </div>
                        </div>
                        <div class="flex items-center p-3 bg-blue-50 rounded-lg">
                            <div class="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mr-3">
                                <i class="fas fa-user text-blue-600"></i>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-medium">박영희님 미팅 예정</p>
                                <p class="text-xs text-zito-gray">오늘 오후 3시</p>
                            </div>
                        </div>
                        <div class="flex items-center p-3 bg-green-50 rounded-lg">
                            <div class="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mr-3">
                                <i class="fas fa-check text-green-600"></i>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-medium">이민수님 팔로업 완료</p>
                                <p class="text-xs text-zito-gray">어제</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            ${isB2B ? `
            <!-- B2B 전용 섹션 -->
            <div class="mt-6 bg-white rounded-xl p-6 shadow-sm">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-lg font-semibold">팀 현황</h2>
                    <button class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition">
                        직원 관리
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="border-b border-gray-200">
                                <th class="text-left py-3 px-4 text-sm font-medium text-zito-gray">직원</th>
                                <th class="text-left py-3 px-4 text-sm font-medium text-zito-gray">부서</th>
                                <th class="text-right py-3 px-4 text-sm font-medium text-zito-gray">명함 조회</th>
                                <th class="text-right py-3 px-4 text-sm font-medium text-zito-gray">교환</th>
                                <th class="text-right py-3 px-4 text-sm font-medium text-zito-gray">리드</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-gray-100 hover:bg-gray-50">
                                <td class="py-3 px-4">
                                    <div class="flex items-center">
                                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                            <span class="text-blue-600 text-xs font-medium">김</span>
                                        </div>
                                        <span class="font-medium">김영업</span>
                                    </div>
                                </td>
                                <td class="py-3 px-4 text-sm text-zito-gray">영업팀</td>
                                <td class="py-3 px-4 text-right font-medium">523</td>
                                <td class="py-3 px-4 text-right font-medium">45</td>
                                <td class="py-3 px-4 text-right font-medium text-green-600">12</td>
                            </tr>
                            <tr class="border-b border-gray-100 hover:bg-gray-50">
                                <td class="py-3 px-4">
                                    <div class="flex items-center">
                                        <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                                            <span class="text-purple-600 text-xs font-medium">박</span>
                                        </div>
                                        <span class="font-medium">박마케팅</span>
                                    </div>
                                </td>
                                <td class="py-3 px-4 text-sm text-zito-gray">마케팅팀</td>
                                <td class="py-3 px-4 text-right font-medium">312</td>
                                <td class="py-3 px-4 text-right font-medium">28</td>
                                <td class="py-3 px-4 text-right font-medium text-green-600">8</td>
                            </tr>
                            <tr class="hover:bg-gray-50">
                                <td class="py-3 px-4">
                                    <div class="flex items-center">
                                        <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                                            <span class="text-green-600 text-xs font-medium">이</span>
                                        </div>
                                        <span class="font-medium">이개발</span>
                                    </div>
                                </td>
                                <td class="py-3 px-4 text-sm text-zito-gray">개발팀</td>
                                <td class="py-3 px-4 text-right font-medium">189</td>
                                <td class="py-3 px-4 text-right font-medium">15</td>
                                <td class="py-3 px-4 text-right font-medium text-green-600">3</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            ` : ''}
        </div>
    </main>
    `;
}
