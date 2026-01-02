// 푸터 컴포넌트
export function renderFooter(): string {
    return `
    <footer class="bg-zito-black text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- 로고 및 설명 -->
                <div class="col-span-1 md:col-span-2">
                    <img src="/images/zito_logo_2.png" alt="Zito" class="h-8 mb-4" onerror="this.outerHTML='<span class=\\'text-2xl font-bold italic\\'>Zito</span>'">
                    <p class="text-gray-400 text-sm">
                        디지털 명함으로 네트워크를 확장하세요.<br>
                        QR, NFC, 링크로 무제한 공유 가능합니다.
                    </p>
                </div>

                <!-- 서비스 -->
                <div>
                    <h3 class="font-semibold mb-4">서비스</h3>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="/plan/free" data-link class="hover:text-white">무료 플랜</a></li>
                        <li><a href="/plan/pro" data-link class="hover:text-white">PRO 플랜</a></li>
                        <li><a href="/plan/b2b" data-link class="hover:text-white">B2B 플랜</a></li>
                        <li><a href="/store" data-link class="hover:text-white">스토어</a></li>
                    </ul>
                </div>

                <!-- 고객지원 -->
                <div>
                    <h3 class="font-semibold mb-4">고객지원</h3>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="/inquiry" data-link class="hover:text-white">도입문의</a></li>
                        <li><a href="#" class="hover:text-white">자주 묻는 질문</a></li>
                        <li><a href="#" class="hover:text-white">이용약관</a></li>
                        <li><a href="#" class="hover:text-white">개인정보처리방침</a></li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                <p>&copy; ${new Date().getFullYear()} Zito. All rights reserved.</p>
            </div>
        </div>
    </footer>
    `;
}
