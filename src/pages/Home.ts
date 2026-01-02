// 홈 페이지
export function renderHomePage(): string {
    return `
    <main class="pt-16">
        <!-- 히어로 섹션 -->
        <section class="bg-gradient-to-b from-gray-50 to-white py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h1 class="text-4xl md:text-5xl font-bold text-zito-black mb-6">
                        디지털 명함으로<br>
                        네트워킹을 혁신하세요
                    </h1>
                    <p class="text-lg text-zito-gray mb-8 max-w-2xl mx-auto">
                        QR 코드, NFC 카드, 링크로 명함을 무제한 공유하고<br>
                        관계 관리까지 한 번에 해결하세요.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/signup" data-link class="px-8 py-4 bg-zito-black text-white font-semibold rounded-xl hover:bg-gray-800 transition">
                            무료로 시작하기
                        </a>
                        <a href="/plan/free" data-link class="px-8 py-4 border-2 border-zito-black text-zito-black font-semibold rounded-xl hover:bg-gray-100 transition">
                            플랜 비교하기
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- 특징 섹션 -->
        <section class="py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl font-bold text-center mb-12">왜 Zito인가요?</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="text-center p-6">
                        <div class="w-16 h-16 bg-zito-black rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-qrcode text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">무제한 공유</h3>
                        <p class="text-zito-gray">QR, NFC, 링크로 명함을 무제한 공유하세요. 종이 명함은 이제 그만!</p>
                    </div>
                    <div class="text-center p-6">
                        <div class="w-16 h-16 bg-zito-black rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-chart-line text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">관계 관리</h3>
                        <p class="text-zito-gray">명함 교환 후 팔로업 알림으로 관계를 유지하세요.</p>
                    </div>
                    <div class="text-center p-6">
                        <div class="w-16 h-16 bg-zito-black rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fas fa-building text-white text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">기업용 솔루션</h3>
                        <p class="text-zito-gray">팀 전체 명함을 일괄 관리하고 브랜딩을 통일하세요.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- 플랜 미리보기 -->
        <section class="bg-gray-50 py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl font-bold text-center mb-12">나에게 맞는 플랜 찾기</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- 무료 플랜 -->
                    <div class="bg-white rounded-2xl p-8 shadow-lg">
                        <h3 class="text-xl font-semibold mb-2">무료</h3>
                        <p class="text-3xl font-bold mb-4">₩0<span class="text-lg font-normal text-zito-gray">/월</span></p>
                        <ul class="space-y-3 mb-6 text-sm">
                            <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>명함 1장 생성</li>
                            <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>QR/링크/NFC 무제한 공유</li>
                            <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>기본 조회 통계</li>
                            <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>명함첩 무제한</li>
                        </ul>
                        <a href="/plan/free" data-link class="block text-center py-3 border-2 border-zito-black text-zito-black font-semibold rounded-xl hover:bg-gray-100 transition">
                            자세히 보기
                        </a>
                    </div>

                    <!-- PRO 플랜 -->
                    <div class="bg-zito-black text-white rounded-2xl p-8 shadow-lg relative">
                        <div class="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">인기</div>
                        <h3 class="text-xl font-semibold mb-2">PRO</h3>
                        <p class="text-3xl font-bold mb-4">₩2,900<span class="text-lg font-normal text-gray-400">/월</span></p>
                        <ul class="space-y-3 mb-6 text-sm">
                            <li class="flex items-center"><i class="fas fa-check text-green-400 mr-2"></i>멀티 명함 5개</li>
                            <li class="flex items-center"><i class="fas fa-check text-green-400 mr-2"></i>로고/커스텀 디자인</li>
                            <li class="flex items-center"><i class="fas fa-check text-green-400 mr-2"></i>관계 관리 & 팔로업 알림</li>
                            <li class="flex items-center"><i class="fas fa-check text-green-400 mr-2"></i>고급 통계 리포트</li>
                            <li class="flex items-center"><i class="fas fa-check text-green-400 mr-2"></i>광고 제거</li>
                        </ul>
                        <a href="/plan/pro" data-link class="block text-center py-3 bg-white text-zito-black font-semibold rounded-xl hover:bg-gray-200 transition">
                            자세히 보기
                        </a>
                    </div>

                    <!-- B2B 플랜 -->
                    <div class="bg-white rounded-2xl p-8 shadow-lg">
                        <h3 class="text-xl font-semibold mb-2">B2B</h3>
                        <p class="text-3xl font-bold mb-4">맞춤<span class="text-lg font-normal text-zito-gray"> 가격</span></p>
                        <ul class="space-y-3 mb-6 text-sm">
                            <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>회사 브랜딩 템플릿</li>
                            <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>직원 명함 일괄 관리</li>
                            <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>커스텀 도메인</li>
                            <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>CRM 연동</li>
                            <li class="flex items-center"><i class="fas fa-check text-green-500 mr-2"></i>팀 대시보드</li>
                        </ul>
                        <a href="/inquiry" data-link class="block text-center py-3 border-2 border-zito-black text-zito-black font-semibold rounded-xl hover:bg-gray-100 transition">
                            도입 문의
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA 섹션 -->
        <section class="py-20">
            <div class="max-w-4xl mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold mb-4">지금 바로 시작하세요</h2>
                <p class="text-zito-gray mb-8">무료로 디지털 명함을 만들고 네트워킹을 시작하세요.</p>
                <a href="/signup" data-link class="inline-block px-8 py-4 bg-zito-black text-white font-semibold rounded-xl hover:bg-gray-800 transition">
                    무료 회원가입
                </a>
            </div>
        </section>
    </main>
    `;
}
