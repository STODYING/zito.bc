// 도입문의 페이지
export function renderInquiryPage(): string {
    return `
    <main class="pt-16 min-h-screen bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 py-16">
            <div class="text-center mb-12">
                <h1 class="text-3xl font-bold text-zito-black mb-4">도입 문의</h1>
                <p class="text-zito-gray">B2B 솔루션 도입에 관해 문의해주세요.<br>담당자가 빠르게 연락드리겠습니다.</p>
            </div>

            <div class="bg-white rounded-2xl shadow-lg p-8">
                <form id="inquiry-form" class="space-y-6">
                    <!-- 회사 정보 -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-zito-black mb-2">회사명 *</label>
                            <input 
                                type="text" 
                                id="inquiry-company" 
                                placeholder="회사명을 입력하세요"
                                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-zito-black transition"
                                required
                            >
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-zito-black mb-2">직원 수 *</label>
                            <select 
                                id="inquiry-size" 
                                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-zito-black transition"
                                required
                            >
                                <option value="">선택하세요</option>
                                <option value="1-10">1-10명</option>
                                <option value="11-50">11-50명</option>
                                <option value="51-200">51-200명</option>
                                <option value="201-500">201-500명</option>
                                <option value="500+">500명 이상</option>
                            </select>
                        </div>
                    </div>

                    <!-- 담당자 정보 -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-zito-black mb-2">담당자 이름 *</label>
                            <input 
                                type="text" 
                                id="inquiry-name" 
                                placeholder="이름을 입력하세요"
                                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-zito-black transition"
                                required
                            >
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-zito-black mb-2">직책</label>
                            <input 
                                type="text" 
                                id="inquiry-position" 
                                placeholder="직책을 입력하세요"
                                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-zito-black transition"
                            >
                        </div>
                    </div>

                    <!-- 연락처 -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-zito-black mb-2">이메일 *</label>
                            <input 
                                type="email" 
                                id="inquiry-email" 
                                placeholder="이메일을 입력하세요"
                                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-zito-black transition"
                                required
                            >
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-zito-black mb-2">전화번호</label>
                            <input 
                                type="tel" 
                                id="inquiry-phone" 
                                placeholder="전화번호를 입력하세요"
                                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-zito-black transition"
                            >
                        </div>
                    </div>

                    <!-- 관심 기능 -->
                    <div>
                        <label class="block text-sm font-medium text-zito-black mb-2">관심 있는 기능 (복수 선택 가능)</label>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <label class="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                                <input type="checkbox" name="features" value="branding" class="mr-2">
                                <span class="text-sm">회사 브랜딩</span>
                            </label>
                            <label class="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                                <input type="checkbox" name="features" value="batch" class="mr-2">
                                <span class="text-sm">직원 명함 일괄 관리</span>
                            </label>
                            <label class="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                                <input type="checkbox" name="features" value="domain" class="mr-2">
                                <span class="text-sm">커스텀 도메인</span>
                            </label>
                            <label class="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                                <input type="checkbox" name="features" value="dashboard" class="mr-2">
                                <span class="text-sm">팀 대시보드</span>
                            </label>
                            <label class="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                                <input type="checkbox" name="features" value="crm" class="mr-2">
                                <span class="text-sm">CRM 연동</span>
                            </label>
                            <label class="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                                <input type="checkbox" name="features" value="nfc" class="mr-2">
                                <span class="text-sm">NFC 카드</span>
                            </label>
                        </div>
                    </div>

                    <!-- 문의 내용 -->
                    <div>
                        <label class="block text-sm font-medium text-zito-black mb-2">문의 내용</label>
                        <textarea 
                            id="inquiry-message" 
                            rows="4"
                            placeholder="추가 문의사항이나 요청사항을 입력해주세요"
                            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-zito-black transition resize-none"
                        ></textarea>
                    </div>

                    <!-- 제출 버튼 -->
                    <button 
                        type="submit" 
                        id="inquiry-submit-btn"
                        class="w-full py-4 bg-zito-black text-white font-semibold rounded-xl hover:bg-gray-800 transition flex items-center justify-center"
                    >
                        <span id="inquiry-btn-text">문의하기</span>
                        <div id="inquiry-spinner" class="spinner ml-2 hidden"></div>
                    </button>
                </form>

                <!-- 메시지 -->
                <div id="inquiry-success" class="hidden mt-4 p-4 bg-green-100 text-green-700 rounded-xl text-center">
                    <i class="fas fa-check-circle text-2xl mb-2"></i>
                    <p class="font-medium">문의가 접수되었습니다!</p>
                    <p class="text-sm">담당자가 빠르게 연락드리겠습니다.</p>
                </div>
                <div id="inquiry-error" class="hidden mt-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm"></div>
            </div>

            <!-- 연락처 정보 -->
            <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl p-6 text-center shadow-sm">
                    <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-envelope text-blue-600"></i>
                    </div>
                    <h3 class="font-semibold mb-1">이메일</h3>
                    <p class="text-sm text-zito-gray">b2b@zito.com</p>
                </div>
                <div class="bg-white rounded-xl p-6 text-center shadow-sm">
                    <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-phone text-green-600"></i>
                    </div>
                    <h3 class="font-semibold mb-1">전화</h3>
                    <p class="text-sm text-zito-gray">02-1234-5678</p>
                </div>
                <div class="bg-white rounded-xl p-6 text-center shadow-sm">
                    <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-clock text-purple-600"></i>
                    </div>
                    <h3 class="font-semibold mb-1">상담 시간</h3>
                    <p class="text-sm text-zito-gray">평일 09:00 - 18:00</p>
                </div>
            </div>
        </div>
    </main>
    `;
}

export function initInquiryEvents(): void {
    const form = document.getElementById('inquiry-form') as HTMLFormElement;
    const submitBtn = document.getElementById('inquiry-submit-btn') as HTMLButtonElement;
    const btnText = document.getElementById('inquiry-btn-text') as HTMLSpanElement;
    const spinner = document.getElementById('inquiry-spinner') as HTMLDivElement;
    const successDiv = document.getElementById('inquiry-success') as HTMLDivElement;
    const errorDiv = document.getElementById('inquiry-error') as HTMLDivElement;

    const setLoading = (loading: boolean) => {
        if (loading) {
            btnText.textContent = '전송 중...';
            spinner.classList.remove('hidden');
            submitBtn.disabled = true;
        } else {
            btnText.textContent = '문의하기';
            spinner.classList.add('hidden');
            submitBtn.disabled = false;
        }
    };

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        setLoading(true);
        errorDiv.classList.add('hidden');

        // 폼 데이터 수집
        const formData = {
            company: (document.getElementById('inquiry-company') as HTMLInputElement).value,
            size: (document.getElementById('inquiry-size') as HTMLSelectElement).value,
            name: (document.getElementById('inquiry-name') as HTMLInputElement).value,
            position: (document.getElementById('inquiry-position') as HTMLInputElement).value,
            email: (document.getElementById('inquiry-email') as HTMLInputElement).value,
            phone: (document.getElementById('inquiry-phone') as HTMLInputElement).value,
            features: Array.from(document.querySelectorAll('input[name="features"]:checked'))
                .map((el) => (el as HTMLInputElement).value),
            message: (document.getElementById('inquiry-message') as HTMLTextAreaElement).value
        };

        // 여기서 실제 API 호출을 하거나 Firebase Firestore에 저장
        // 현재는 시뮬레이션
        try {
            console.log('문의 데이터:', formData);
            
            // Firebase Firestore에 저장하는 코드 (선택사항)
            // await addDoc(collection(db, 'inquiries'), {
            //     ...formData,
            //     createdAt: serverTimestamp()
            // });

            // 성공 시뮬레이션 (1초 후)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            form.classList.add('hidden');
            successDiv.classList.remove('hidden');
        } catch (error) {
            console.error('문의 전송 실패:', error);
            errorDiv.textContent = '문의 전송에 실패했습니다. 다시 시도해주세요.';
            errorDiv.classList.remove('hidden');
        } finally {
            setLoading(false);
        }
    });
}
