// ============================================
// Zito Web App - Main Application Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // 모바일 메뉴 토글
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 도입문의 폼 처리
    const inquiryForm = document.getElementById('inquiry-form');
    const inquirySuccess = document.getElementById('inquiry-success');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                companyName: document.getElementById('company-name')?.value || '',
                contactName: document.getElementById('contact-name')?.value || '',
                email: document.getElementById('contact-email')?.value || '',
                phone: document.getElementById('contact-phone')?.value || '',
                teamSize: document.getElementById('team-size')?.value || '',
                features: Array.from(document.querySelectorAll('input[name="features"]:checked')).map(cb => cb.value),
                message: document.getElementById('inquiry-message')?.value || '',
                submittedAt: new Date().toISOString()
            };
            
            try {
                // Firestore에 문의 내용 저장
                if (db) {
                    await db.collection('inquiries').add(formData);
                    console.log('✅ 문의 저장 완료');
                }
                
                // 성공 UI 표시
                inquiryForm.classList.add('hidden');
                if (inquirySuccess) {
                    inquirySuccess.classList.remove('hidden');
                }
            } catch (error) {
                console.error('❌ 문의 저장 실패:', error);
                alert('문의 접수에 실패했습니다. 다시 시도해주세요.');
            }
        });
    }

    // 스크롤 시 네비게이션 효과
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                nav.classList.add('shadow-lg');
            } else {
                nav.classList.remove('shadow-lg');
            }
        });
    }

    // 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
