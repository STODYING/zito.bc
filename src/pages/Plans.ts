// 플랜 페이지들

// 무료 플랜 페이지
export function renderFreePlanPage(): string {
    return `
    <main class="pt-16 min-h-screen">
        <!-- 히어로 -->
        <section class="bg-gradient-to-b from-gray-50 to-white py-16">
            <div class="max-w-4xl mx-auto px-4 text-center">
                <span class="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">무료 플랜</span>
                <h1 class="text-4xl font-bold text-zito-black mb-4">완전 무료로 시작하세요</h1>
                <p class="text-lg text-zito-gray mb-8">
                    공유와 실사용이 가능한 진짜 무료 디지털 명함.<br>
                    숨겨진 비용 없이 시작하세요.
                </p>
                <div class="text-5xl font-bold text-zito-black mb-2">₩0</div>
                <p class="text-zito-gray">영원히 무료</p>
            </div>
        </section>

        <!-- 기능 목록 -->
        <section class="py-16">
            <div class="max-w-4xl mx-auto px-4">
                <h2 class="text-2xl font-bold text-center mb-12">무료 플랜에 포함된 기능</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <i class="fas fa-id-card text-green-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">명함 1장 생성</h3>
                            <p class="text-sm text-zito-gray">기본 정보, 한글/영문, SNS·포트폴리오 링크, 프로필 사진</p>
                        </div>
                    </div>
                    <div class="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <i class="fas fa-share-alt text-blue-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">무제한 공유</h3>
                            <p class="text-sm text-zito-gray">QR 코드, 링크, NFC(카드)로 무제한 공유</p>
                        </div>
                    </div>
                    <div class="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <i class="fas fa-chart-bar text-purple-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">기본 통계</h3>
                            <p class="text-sm text-zito-gray">조회수 등 아주 기본적인 통계 제공</p>
                        </div>
                    </div>
                    <div class="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <i class="fas fa-address-book text-orange-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">명함첩 무제한</h3>
                            <p class="text-sm text-zito-gray">받은 명함을 무제한으로 저장하고 관리</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 경쟁사 비교 -->
        <section class="bg-gray-50 py-16">
            <div class="max-w-4xl mx-auto px-4">
                <h2 class="text-2xl font-bold text-center mb-8">Slice와의 차이점</h2>
                <div class="bg-white rounded-xl p-6 shadow-sm">
                    <p class="text-zito-gray mb-4">
                        Slice는 이제 개인도 연 구독료를 내야 실사용 기능(공유, 추가 저장 등)을 계속 쓸 수 있는 구조로 바뀌어,
                        <strong>"완전 무료"는 사실상 사라진 상태</strong>입니다.
                    </p>
                    <p class="text-zito-black font-medium">
                        Zito는 <span class="text-green-600">"공유와 실사용이 가능한 진짜 무료 디지털 명함"</span>을 제공합니다.
                    </p>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="py-16">
            <div class="max-w-4xl mx-auto px-4 text-center">
                <h2 class="text-2xl font-bold mb-4">지금 바로 시작하세요</h2>
                <p class="text-zito-gray mb-8">무료로 디지털 명함을 만들고 네트워킹을 시작하세요.</p>
                <a href="/signup" data-link class="inline-block px-8 py-4 bg-zito-black text-white font-semibold rounded-xl hover:bg-gray-800 transition">
                    무료 회원가입
                </a>
            </div>
        </section>
    </main>
    `;
}

// PRO 플랜 페이지
export function renderProPlanPage(): string {
    return `
    <main class="pt-16 min-h-screen">
        <!-- 히어로 -->
        <section class="bg-gradient-to-b from-zito-black to-gray-800 py-16 text-white">
            <div class="max-w-4xl mx-auto px-4 text-center">
                <span class="inline-block px-4 py-1 bg-yellow-400 text-black rounded-full text-sm font-medium mb-4">PRO 플랜</span>
                <h1 class="text-4xl font-bold mb-4">관계 관리의 시작</h1>
                <p class="text-lg text-gray-300 mb-8">
                    멀티 명함, 커스텀 디자인, 팔로업 알림까지.<br>
                    Slice 절반 가격으로 더 강력한 기능을.
                </p>
                <div class="flex items-baseline justify-center gap-2 mb-2">
                    <span class="text-5xl font-bold">₩2,900</span>
                    <span class="text-gray-400">/월</span>
                </div>
                <p class="text-gray-400 mb-4">연간 결제 시 ₩32,000/년 (약 2개월 무료)</p>
                <a href="/signup" data-link class="inline-block px-8 py-4 bg-white text-zito-black font-semibold rounded-xl hover:bg-gray-200 transition">
                    PRO 시작하기
                </a>
            </div>
        </section>

        <!-- 기능 목록 -->
        <section class="py-16">
            <div class="max-w-4xl mx-auto px-4">
                <h2 class="text-2xl font-bold text-center mb-12">PRO 플랜에 포함된 기능</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <i class="fas fa-clone text-indigo-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">멀티 명함 (최대 5개)</h3>
                            <p class="text-sm text-zito-gray">직장용, 프리랜서용, 사이드프로젝트용 등 상황에 맞는 명함</p>
                        </div>
                    </div>
                    <div class="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <i class="fas fa-palette text-pink-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">디자인 & 브랜딩 강화</h3>
                            <p class="text-sm text-zito-gray">로고 업로드, 고급 템플릿, 커스터마이즈</p>
                        </div>
                    </div>
                    <div class="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <i class="fas fa-users text-green-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">관계 관리</h3>
                            <p class="text-sm text-zito-gray">명함 교환 시 메모, 태그(업종, 이벤트명)</p>
                        </div>
                    </div>
                    <div class="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <i class="fas fa-bell text-yellow-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">팔로업 알림</h3>
                            <p class="text-sm text-zito-gray">3일 후 팔로업 알림, 관계 유지용 리마인더</p>
                        </div>
                    </div>
                    <div class="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <i class="fas fa-chart-line text-blue-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">고급 통계</h3>
                            <p class="text-sm text-zito-gray">링크별 클릭 수, 조회 시간대 분석 리포트</p>
                        </div>
                    </div>
                    <div class="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <i class="fas fa-ban text-red-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">광고 제거</h3>
                            <p class="text-sm text-zito-gray">깔끔한 명함으로 프로페셔널 이미지 유지</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 가격 비교 -->
        <section class="bg-gray-50 py-16">
            <div class="max-w-4xl mx-auto px-4">
                <h2 class="text-2xl font-bold text-center mb-8">Slice 대비 50% 저렴</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-200">
                        <h3 class="font-semibold text-zito-gray mb-4">Slice PRO</h3>
                        <div class="text-3xl font-bold text-zito-gray mb-2">~₩5,000<span class="text-lg font-normal">/월</span></div>
                        <p class="text-sm text-zito-gray">연 약 60,000원</p>
                    </div>
                    <div class="bg-zito-black text-white rounded-xl p-6 shadow-sm">
                        <h3 class="font-semibold mb-4">Zito PRO</h3>
                        <div class="text-3xl font-bold mb-2">₩2,900<span class="text-lg font-normal">/월</span></div>
                        <p class="text-sm text-gray-400">연 32,000원 (약 47% 절감)</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="py-16">
            <div class="max-w-4xl mx-auto px-4 text-center">
                <h2 class="text-2xl font-bold mb-4">관계 관리를 시작하세요</h2>
                <p class="text-zito-gray mb-8">PRO 플랜으로 네트워킹을 한 단계 업그레이드하세요.</p>
                <a href="/signup" data-link class="inline-block px-8 py-4 bg-zito-black text-white font-semibold rounded-xl hover:bg-gray-800 transition">
                    PRO 시작하기
                </a>
            </div>
        </section>
    </main>
    `;
}

// B2B 플랜 페이지
export function renderB2BPlanPage(): string {
    return `
    <main class="pt-16 min-h-screen">
        <!-- 히어로 -->
        <section class="bg-gradient-to-b from-gray-900 to-gray-800 py-16 text-white">
            <div class="max-w-4xl mx-auto px-4 text-center">
                <span class="inline-block px-4 py-1 bg-blue-500 text-white rounded-full text-sm font-medium mb-4">B2B 플랜</span>
                <h1 class="text-4xl font-bold mb-4">기업을 위한 명함 솔루션</h1>
                <p class="text-lg text-gray-300 mb-8">
                    브랜딩 통일, 직원 명함 일괄 관리,<br>
                    CRM 연동까지 올인원 솔루션
                </p>
                <div class="flex items-baseline justify-center gap-2 mb-2">
                    <span class="text-4xl font-bold">맞춤 견적</span>
                </div>
                <p class="text-gray-400 mb-4">기업 규모와 필요 기능에 따른 맞춤 가격</p>
                <a href="/inquiry" data-link class="inline-block px-8 py-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition">
                    도입 문의하기
                </a>
            </div>
        </section>

        <!-- 기능 목록 -->
        <section class="py-16">
            <div class="max-w-4xl mx-auto px-4">
                <h2 class="text-2xl font-bold text-center mb-12">B2B 플랜에 포함된 기능</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <i class="fas fa-building text-blue-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">회사 브랜딩 템플릿</h3>
                            <p class="text-sm text-zito-gray">로고, 브랜드 컬러, 폰트 일괄 적용</p>
                        </div>
                    </div>
                    <div class="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <i class="fas fa-users-cog text-green-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">직원 명함 일괄 관리</h3>
                            <p class="text-sm text-zito-gray">입·퇴사 시 자동 회수·전환</p>
                        </div>
                    </div>
                    <div class="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <i class="fas fa-globe text-purple-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">커스텀 도메인</h3>
                            <p class="text-sm text-zito-gray">card.company.com/이름 형태의 링크</p>
                        </div>
                    </div>
                    <div class="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <i class="fas fa-chart-pie text-orange-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">팀/조직 대시보드</h3>
                            <p class="text-sm text-zito-gray">인원별 명함 조회수, 이벤트별 교환 수, 전체 리드 추이</p>
                        </div>
                    </div>
                    <div class="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <i class="fas fa-plug text-pink-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">CRM 연동</h3>
                            <p class="text-sm text-zito-gray">HubSpot, Notion DB, Google Sheets 연동</p>
                        </div>
                    </div>
                    <div class="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <i class="fas fa-funnel-dollar text-indigo-600 text-xl"></i>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-1">세일즈 파이프라인</h3>
                            <p class="text-sm text-zito-gray">팀용 파이프라인 뷰로 잠재고객 관리</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 차별화 포인트 -->
        <section class="bg-gray-50 py-16">
            <div class="max-w-4xl mx-auto px-4">
                <h2 class="text-2xl font-bold text-center mb-8">명함 기반 리드 관리 솔루션</h2>
                <div class="bg-white rounded-xl p-6 shadow-sm">
                    <p class="text-zito-gray mb-4">
                        Slice도 기업용 요금제로 직원 명함 일괄 발급·브랜딩 적용·NFC 카드 제공은 이미 하고 있습니다.
                        하지만 팀 세일즈/마케팅 관점의 파이프라인·리드 관리, 세부 분석 기능은 아직 CRM 수준으로 깊게 들어가진 않은 편입니다.
                    </p>
                    <p class="text-zito-black font-medium">
                        Zito B2B는 <span class="text-blue-600">"명함 기반 리드 관리·세일즈 툴"</span>로 포지셔닝하여,
                        단순 명함을 넘어 영업 성과까지 연결합니다.
                    </p>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="py-16">
            <div class="max-w-4xl mx-auto px-4 text-center">
                <h2 class="text-2xl font-bold mb-4">기업 맞춤 상담을 받아보세요</h2>
                <p class="text-zito-gray mb-8">조직 규모와 필요 기능에 맞는 최적의 솔루션을 제안드립니다.</p>
                <a href="/inquiry" data-link class="inline-block px-8 py-4 bg-zito-black text-white font-semibold rounded-xl hover:bg-gray-800 transition">
                    도입 문의하기
                </a>
            </div>
        </section>
    </main>
    `;
}
