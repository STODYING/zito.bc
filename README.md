# Zito - 디지털 명함 서비스

## Project Overview
- **Name**: Zito Web App
- **Goal**: 디지털 명함 서비스 메인 웹사이트
- **Features**: 로그인/회원가입, 플랜 소개, 스토어, 도입문의, 대시보드

## URLs
- **Production**: (배포 후 업데이트)
- **GitHub**: (설정 후 업데이트)

## 프로젝트 구조

```
webapp/
├── src/
│   ├── index.tsx           # 메인 라우터
│   ├── renderer.tsx        # HTML 렌더러
│   ├── components/
│   │   ├── Navbar.tsx      # 네비게이션 바
│   │   └── Footer.tsx      # 푸터
│   └── pages/
│       ├── Home.tsx        # 홈페이지
│       ├── Login.tsx       # 로그인 페이지
│       ├── Signup.tsx      # 회원가입 페이지
│       ├── Plans.tsx       # 플랜 페이지 (무료/PRO/B2B)
│       ├── Inquiry.tsx     # 도입문의 페이지
│       ├── Store.tsx       # 스토어 페이지
│       └── Dashboard.tsx   # 대시보드 페이지
├── public/
│   └── static/
│       ├── app.js          # Firebase 인증 로직
│       ├── style.css       # 커스텀 스타일
│       └── images/
│           └── zito_logo_2.png  # 로고 이미지 (업로드 필요)
├── ecosystem.config.cjs    # PM2 설정
├── package.json
├── tsconfig.json
├── vite.config.ts
└── wrangler.jsonc
```

## 기능 요약

### 완료된 기능
- [x] 메인 페이지 (Hero, Features, 플랜 비교)
- [x] 네비게이션 바 (로그인 상태에 따른 UI 변경)
- [x] 로그인 페이지 (이메일, Google, Apple)
- [x] 회원가입 페이지 (이메일, Google, Apple)
- [x] 플랜 페이지 (무료, PRO, B2B)
- [x] 도입문의 페이지
- [x] 스토어 페이지
- [x] 대시보드 페이지 (플랜별 기능 분기)
- [x] Firebase 인증 연동 준비

### 미완료 기능
- [ ] 실제 Firebase 프로젝트 연결
- [ ] 로고 이미지 업로드
- [ ] Cloudflare 배포
- [ ] GitHub 연동

## API 엔드포인트

| Method | Path | 설명 |
|--------|------|------|
| GET | / | 홈페이지 |
| GET | /login | 로그인 페이지 |
| GET | /signup | 회원가입 페이지 |
| GET | /plan/free | 무료 플랜 페이지 |
| GET | /plan/pro | PRO 플랜 페이지 |
| GET | /plan/b2b | B2B 플랜 페이지 |
| GET | /inquiry | 도입문의 페이지 |
| GET | /store | 스토어 페이지 |
| GET | /dashboard | 대시보드 (로그인 필요) |
| POST | /api/inquiry | 도입문의 제출 |

## 플랜 구조

### 무료 플랜 (FREE)
- 명함 1장 생성
- QR/링크/NFC 무제한 공유
- 기본 조회수 통계
- 명함첩 무제한

### PRO 플랜 (월 2,900원 / 연 32,000원)
- 멀티 명함 최대 5개
- 고급 디자인/브랜딩
- 관계 관리 & 팔로업 알림
- 고급 통계 리포트
- 광고 제거
- **대시보드 접근 가능**

### B2B 플랜 (맞춤 견적)
- 회사 브랜딩 템플릿
- 직원 명함 일괄 관리
- 커스텀 도메인
- CRM 연동
- 팀 파이프라인 관리
- **대시보드 접근 가능**

## Firestore 데이터 구조

### users 컬렉션
```javascript
{
  uid: string,
  email: string,
  name: string,
  provider: 'email' | 'google' | 'apple',
  plan: 'FREE' | 'PRO' | 'B2B',
  role: 'USER' | 'ADMIN',
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## 사용 방법

### 개발 환경 실행
```bash
cd /home/user/webapp
npm run build
pm2 start ecosystem.config.cjs
```

### 로컬 테스트
```bash
curl http://localhost:3000
```

### 배포
```bash
npm run deploy:prod
```

## Firebase 설정

`public/static/app.js` 파일에서 Firebase 설정을 업데이트해야 합니다:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 기술 스택
- **Frontend**: Hono JSX, TailwindCSS (CDN), Vanilla JavaScript
- **Backend**: Hono (Cloudflare Workers)
- **Auth**: Firebase Authentication
- **Database**: Firebase Firestore
- **Deployment**: Cloudflare Pages

## 다음 단계
1. Firebase 프로젝트 생성 및 설정 연결
2. zito_logo_2.png 로고 이미지 업로드
3. GitHub 저장소 생성 및 푸시
4. Cloudflare Pages 배포

---
Last Updated: 2026-01-02
