// 스토어 페이지
export function renderStorePage(): string {
    return `
    <main class="pt-16 min-h-screen">
        <!-- 히어로 -->
        <section class="bg-gradient-to-b from-gray-50 to-white py-16">
            <div class="max-w-4xl mx-auto px-4 text-center">
                <h1 class="text-3xl font-bold text-zito-black mb-4">Zito 스토어</h1>
                <p class="text-lg text-zito-gray">NFC 카드와 액세서리로 명함 공유를 더 스마트하게</p>
            </div>
        </section>

        <!-- 상품 목록 -->
        <section class="py-16">
            <div class="max-w-6xl mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- NFC 카드 - 베이직 -->
                    <div class="bg-white rounded-2xl shadow-lg overflow-hidden group">
                        <div class="aspect-square bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition">
                            <div class="w-48 h-32 bg-zito-black rounded-xl flex items-center justify-center shadow-lg">
                                <span class="text-white font-bold italic text-xl">Zito</span>
                            </div>
                        </div>
                        <div class="p-6">
                            <span class="text-xs text-blue-600 font-medium">NFC 카드</span>
                            <h3 class="text-lg font-semibold mt-1 mb-2">Zito Card - 베이직</h3>
                            <p class="text-sm text-zito-gray mb-4">매트 블랙 소재, 기본 로고 각인</p>
                            <div class="flex items-center justify-between">
                                <span class="text-xl font-bold">₩15,000</span>
                                <button class="px-4 py-2 bg-zito-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
                                    구매하기
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- NFC 카드 - 프리미엄 -->
                    <div class="bg-white rounded-2xl shadow-lg overflow-hidden group relative">
                        <div class="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">인기</div>
                        <div class="aspect-square bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition">
                            <div class="w-48 h-32 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg">
                                <span class="text-white font-bold italic text-xl">Zito</span>
                            </div>
                        </div>
                        <div class="p-6">
                            <span class="text-xs text-blue-600 font-medium">NFC 카드</span>
                            <h3 class="text-lg font-semibold mt-1 mb-2">Zito Card - 프리미엄</h3>
                            <p class="text-sm text-zito-gray mb-4">메탈 소재, 커스텀 로고/이름 각인</p>
                            <div class="flex items-center justify-between">
                                <span class="text-xl font-bold">₩35,000</span>
                                <button class="px-4 py-2 bg-zito-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
                                    구매하기
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- NFC 카드 - 골드 -->
                    <div class="bg-white rounded-2xl shadow-lg overflow-hidden group">
                        <div class="aspect-square bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition">
                            <div class="w-48 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                                <span class="text-white font-bold italic text-xl drop-shadow">Zito</span>
                            </div>
                        </div>
                        <div class="p-6">
                            <span class="text-xs text-blue-600 font-medium">NFC 카드</span>
                            <h3 class="text-lg font-semibold mt-1 mb-2">Zito Card - 골드</h3>
                            <p class="text-sm text-zito-gray mb-4">24K 골드 플레이팅, VIP 각인</p>
                            <div class="flex items-center justify-between">
                                <span class="text-xl font-bold">₩59,000</span>
                                <button class="px-4 py-2 bg-zito-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
                                    구매하기
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- NFC 스티커 -->
                    <div class="bg-white rounded-2xl shadow-lg overflow-hidden group">
                        <div class="aspect-square bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition">
                            <div class="w-24 h-24 bg-white border-4 border-zito-black rounded-full flex items-center justify-center shadow">
                                <i class="fas fa-wifi text-zito-black text-2xl transform rotate-45"></i>
                            </div>
                        </div>
                        <div class="p-6">
                            <span class="text-xs text-green-600 font-medium">NFC 스티커</span>
                            <h3 class="text-lg font-semibold mt-1 mb-2">Zito Sticker (5장)</h3>
                            <p class="text-sm text-zito-gray mb-4">어디든 부착 가능한 NFC 스티커</p>
                            <div class="flex items-center justify-between">
                                <span class="text-xl font-bold">₩12,000</span>
                                <button class="px-4 py-2 bg-zito-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
                                    구매하기
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- 카드 홀더 -->
                    <div class="bg-white rounded-2xl shadow-lg overflow-hidden group">
                        <div class="aspect-square bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition">
                            <div class="w-40 h-48 bg-zito-black rounded-xl flex items-end justify-center pb-8 shadow-lg">
                                <div class="w-32 h-20 bg-gray-300 rounded-lg"></div>
                            </div>
                        </div>
                        <div class="p-6">
                            <span class="text-xs text-purple-600 font-medium">액세서리</span>
                            <h3 class="text-lg font-semibold mt-1 mb-2">Zito 카드 홀더</h3>
                            <p class="text-sm text-zito-gray mb-4">가죽 소재, 카드 보관 및 휴대용</p>
                            <div class="flex items-center justify-between">
                                <span class="text-xl font-bold">₩25,000</span>
                                <button class="px-4 py-2 bg-zito-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
                                    구매하기
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- B2B 패키지 -->
                    <div class="bg-white rounded-2xl shadow-lg overflow-hidden group">
                        <div class="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center group-hover:opacity-90 transition">
                            <div class="text-center text-white">
                                <i class="fas fa-building text-5xl mb-4"></i>
                                <p class="font-semibold">기업 대량 주문</p>
                            </div>
                        </div>
                        <div class="p-6">
                            <span class="text-xs text-orange-600 font-medium">B2B</span>
                            <h3 class="text-lg font-semibold mt-1 mb-2">기업 대량 주문 패키지</h3>
                            <p class="text-sm text-zito-gray mb-4">50장 이상 대량 주문 시 할인</p>
                            <div class="flex items-center justify-between">
                                <span class="text-xl font-bold">견적 문의</span>
                                <a href="/inquiry" data-link class="px-4 py-2 bg-zito-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
                                    문의하기
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- NFC 사용법 -->
        <section class="bg-gray-50 py-16">
            <div class="max-w-4xl mx-auto px-4">
                <h2 class="text-2xl font-bold text-center mb-12">NFC 카드 사용법</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div class="w-16 h-16 bg-zito-black rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-white text-xl font-bold">1</span>
                        </div>
                        <h3 class="font-semibold mb-2">카드 연결</h3>
                        <p class="text-sm text-zito-gray">Zito 앱에서 NFC 카드를 내 명함에 연결하세요</p>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 bg-zito-black rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-white text-xl font-bold">2</span>
                        </div>
                        <h3 class="font-semibold mb-2">태그하기</h3>
                        <p class="text-sm text-zito-gray">상대방 스마트폰 뒷면에 카드를 터치하세요</p>
                    </div>
                    <div class="text-center">
                        <div class="w-16 h-16 bg-zito-black rounded-full flex items-center justify-center mx-auto mb-4">
                            <span class="text-white text-xl font-bold">3</span>
                        </div>
                        <h3 class="font-semibold mb-2">명함 공유</h3>
                        <p class="text-sm text-zito-gray">앱 설치 없이 즉시 내 명함이 표시됩니다</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ -->
        <section class="py-16">
            <div class="max-w-4xl mx-auto px-4">
                <h2 class="text-2xl font-bold text-center mb-12">자주 묻는 질문</h2>
                <div class="space-y-4">
                    <div class="bg-white rounded-xl p-6 shadow-sm">
                        <h3 class="font-semibold mb-2">NFC 카드가 작동하려면 앱이 필요한가요?</h3>
                        <p class="text-sm text-zito-gray">아니요! 명함을 받는 상대방은 앱 없이도 스마트폰만 있으면 바로 명함을 확인할 수 있습니다.</p>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-sm">
                        <h3 class="font-semibold mb-2">카드는 방수가 되나요?</h3>
                        <p class="text-sm text-zito-gray">베이직과 프리미엄 카드 모두 생활 방수 수준입니다. 물에 담그지만 마세요.</p>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-sm">
                        <h3 class="font-semibold mb-2">명함 정보를 바꾸면 카드도 바꿔야 하나요?</h3>
                        <p class="text-sm text-zito-gray">아니요! 앱에서 명함 정보를 수정하면 카드에 연결된 링크로 자동 반영됩니다.</p>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-sm">
                        <h3 class="font-semibold mb-2">배송은 얼마나 걸리나요?</h3>
                        <p class="text-sm text-zito-gray">주문 후 영업일 기준 3-5일 이내 배송됩니다. 커스텀 각인 제품은 5-7일 소요됩니다.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
    `;
}
