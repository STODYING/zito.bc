# Zito - 디지털 명함 서비스

## 프로젝트 개요
- **Name**: Zito (지토)
- **Goal**: 공유와 실사용이 가능한 진짜 무료 디지털 명함 서비스
- **Tech Stack**: HTML5, TailwindCSS, JavaScript, Firebase (Auth + Firestore)

## 현재 구현된 기능

### ✅ 완료된 기능
1. **메인 페이지**: 서비스 소개 및 CTA
2. **헤더 네비게이션**: 
   - Zito 로고
   - 플랜 메뉴 (무료, PRO, B2B)
   - 도입문의, 스토어
   - 로그인/회원가입/로그아웃 버튼
   - 대시보드 버튼 (PRO/B2B 유저만 표시)
3. **플랜 페이지**:
   - 무료 플랜: 기본 명함 기능
   - PRO 플랜: 멀티 명함, 관계 관리, 고급 통계
   - B2B 플랜: 팀/조직용 솔루션
4. **도입문의 페이지**: B2B 상담 신청 폼
5. **스토어 페이지**: NFC 카드 및 액세서리 (UI only)
6. **인증 시스템**:
   - 이메일 회원가입/로그인
   - Google 소셜 로그인
   - Apple 소셜 로그인
   - 로그아웃
7. **대시보드 페이지**: PRO/B2B 전용 통계 및 명함 관리 UI

## 기능별 URI

| 페이지 | URL Hash | 설명 |
|--------|----------|------|
| 홈 | `#home` | 메인 랜딩 페이지 |
| 무료 플랜 | `#plan-free` | 무료 플랜 안내 |
| PRO 플랜 | `#plan-pro` | PRO 플랜 안내 |
| B2B 플랜 | `#plan-b2b` | B2B 플랜 안내 |
| 도입문의 | `#inquiry` | B2B 상담 신청 |
| 스토어 | `#store` | NFC 제품 판매 |
| 대시보드 | `#dashboard` | 사용자 대시보드 (로그인 필요) |

## 아직 구현되지 않은 기능
- [ ] 실제 명함 생성/편집 기능
- [ ] NFC 카드 결제 시스템
- [ ] 명함 공유 기능 (QR, 링크)
- [ ] 명함첩 관리
- [ ] 통계 데이터 실제 연동
- [ ] 팔로업 리마인더 알림
- [ ] CRM 연동 (HubSpot, Notion 등)

## 개발 환경 설정

### Firebase 설정
1. [Firebase Console](https://console.firebase.google.com/)에서 프로젝트 생성
2. Authentication에서 이메일/비밀번호, Google, Apple 로그인 활성화
3. Firestore Database 생성
4. 프로젝트 설정에서 웹 앱 추가 후 설정값 복사

### 로컬 개발
`js/firebase-config.js` 파일에서 Firebase 설정값 수정:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Netlify 배포 시 환경변수 설정
Netlify 관리자 > Site settings > Environment variables에서 설정:
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`

## Netlify 배포

이 프로젝트는 정적 SPA로 구성되어 Netlify에 바로 배포 가능합니다.

### 배포 방법
1. GitHub에 `webapp` 폴더 업로드
2. Netlify에서 GitHub 레포지토리 연결
3. Build settings:
   - Build command: (비워두기)
   - Publish directory: `.`
4. Deploy!

### SPA 라우팅
`_redirects` 파일과 `netlify.toml`이 SPA 라우팅을 처리합니다.
모든 경로가 `index.html`로 리다이렉트되어 클라이언트 사이드 라우팅이 동작합니다.

## 파일 구조
```
webapp/
├── index.html          # 메인 HTML (SPA)
├── js/
│   ├── firebase-config.js  # Firebase 설정
│   └── app.js              # 메인 앱 로직
├── assets/
│   └── zito_logo_2.png     # 로고 이미지 (업로드 필요)
├── _redirects          # Netlify SPA 라우팅
├── netlify.toml        # Netlify 설정
├── .gitignore          # Git 무시 파일
└── README.md           # 프로젝트 문서
```

## Firestore 데이터 구조

### users 컬렉션
```javascript
{
  uid: "string",           // Firebase Auth UID
  email: "string",         // 이메일
  name: "string",          // 이름
  provider: "email|google|apple",  // 로그인 방식
  plan: "FREE|PRO|B2B",    // 플랜 (기본값: FREE)
  role: "USER|ADMIN",      // 권한 (기본값: USER)
  createdAt: Timestamp,    // 생성일
  updatedAt: Timestamp     // 수정일
}
```

### inquiries 컬렉션
```javascript
{
  company: "string",       // 회사명
  name: "string",          // 담당자명
  email: "string",         // 이메일
  phone: "string",         // 연락처
  size: "string",          // 예상 인원 수
  message: "string",       // 문의 내용
  createdAt: Timestamp     // 생성일
}
```

## 다음 단계 권장사항
1. 로고 이미지 업로드 (`assets/zito_logo_2.png`)
2. Firebase 프로젝트 설정 및 환경변수 구성
3. Firestore 보안 규칙 설정
4. 실제 명함 CRUD 기능 구현
5. 결제 시스템 연동 (Stripe/토스페이먼츠)

## 라이선스
© 2025 Zito. All rights reserved.
