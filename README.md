# Zito - 디지털 명함 웹사이트

## 프로젝트 개요
- **Name**: Zito Website
- **Goal**: 디지털 명함 서비스의 메인 웹사이트 및 인증 시스템
- **Tech Stack**: React + Vite + Firebase Authentication + Firestore

## URLs
- **Preview**: [샌드박스 미리보기](https://3000-ingkswzffr5w47ipew3c2-2b54fc91.sandbox.novita.ai)
- **Production**: Netlify에 배포 후 생성

## 완료된 기능

### ✅ 페이지
- **홈 (/)**: 메인 랜딩 페이지
- **무료 플랜 (/plan/free)**: 무료 플랜 소개
- **Pro 플랜 (/plan/pro)**: 유료 개인 플랜 소개
- **B2B 플랜 (/plan/b2b)**: 팀/조직용 플랜 소개
- **도입문의 (/inquiry)**: B2B 문의 양식
- **스토어 (/store)**: NFC 카드 등 물리적 제품 스토어
- **대시보드 (/dashboard)**: 유료 사용자 전용 대시보드

### ✅ 인증 시스템
- 이메일 회원가입/로그인
- Google 소셜 로그인
- Apple 소셜 로그인
- Firebase Firestore에 사용자 정보 저장
- 플랜별 권한 관리 (FREE, PRO, B2B)

### ✅ 네비게이션
- 검정 배경 헤더 (이미지 참고)
- Zito 로고 (PNG 또는 텍스트 대체)
- 플랜 | 무료 PRO B2B | 도입문의 | 스토어 메뉴
- 로그인/회원가입 버튼
- PRO/B2B 사용자에게 대시보드 버튼 표시

## 미완료/TODO
- [ ] zito_logo_2.png 로고 파일 업로드
- [ ] 실제 Firebase 프로젝트 연동 테스트
- [ ] 스토어 결제 시스템 연동
- [ ] 도입문의 폼 백엔드 연결
- [ ] 대시보드 실제 데이터 연동

## GitHub 폴더 구조

```
webapp/
├── public/                      # 정적 파일
│   ├── _redirects               # Netlify SPA 라우팅
│   ├── favicon.svg              # 파비콘
│   └── zito_logo_2.png          # 로고 (업로드 필요)
│
├── src/
│   ├── components/              # 재사용 컴포넌트
│   │   ├── AuthModal.jsx        # 로그인/회원가입 모달
│   │   └── Header.jsx           # 네비게이션 헤더
│   │
│   ├── contexts/                # React Context
│   │   └── AuthContext.jsx      # 인증 상태 관리
│   │
│   ├── firebase/                # Firebase 설정
│   │   ├── auth.js              # 인증 함수들
│   │   └── config.js            # Firebase 초기화
│   │
│   ├── pages/                   # 페이지 컴포넌트
│   │   ├── Dashboard.jsx        # 대시보드 (유료 전용)
│   │   ├── Home.jsx             # 메인 랜딩
│   │   ├── Inquiry.jsx          # 도입문의
│   │   ├── PlanB2B.jsx          # B2B 플랜
│   │   ├── PlanFree.jsx         # 무료 플랜
│   │   ├── PlanPro.jsx          # Pro 플랜
│   │   └── Store.jsx            # 스토어
│   │
│   ├── styles/                  # 스타일
│   │   └── global.css           # 전역 스타일
│   │
│   ├── App.jsx                  # 메인 앱 컴포넌트
│   └── main.jsx                 # 엔트리 포인트
│
├── .env.example                 # 환경변수 예시
├── .gitignore                   # Git 무시 파일
├── index.html                   # HTML 템플릿
├── netlify.toml                 # Netlify 설정
├── package.json                 # 의존성
├── vite.config.js               # Vite 설정
└── README.md                    # 이 파일
```

## Netlify 배포 설정

### 1. 환경변수 설정 (Netlify Dashboard)
Netlify의 Site settings > Environment variables에서 다음 변수들을 설정하세요:

| 변수명 | 설명 |
|--------|------|
| `REACT_APP_FIREBASE_API_KEY` | Firebase API 키 |
| `REACT_APP_FIREBASE_AUTH_DOMAIN` | Firebase Auth 도메인 |
| `REACT_APP_FIREBASE_PROJECT_ID` | Firebase 프로젝트 ID |
| `REACT_APP_FIREBASE_STORAGE_BUCKET` | Firebase Storage 버킷 |
| `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | Firebase 메시징 ID |
| `REACT_APP_FIREBASE_APP_ID` | Firebase 앱 ID |

> 참고: `REACT_APP_` 접두사 환경변수가 자동으로 `VITE_` 접두사로 매핑됩니다.

### 2. 빌드 설정
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### 3. SPA 라우팅
`netlify.toml`과 `public/_redirects`가 자동으로 SPA 라우팅을 처리합니다.

## 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 데이터 구조

### Firestore Users Collection
```javascript
{
  uid: string,           // Firebase Auth UID
  email: string,         // 이메일
  name: string,          // 이름
  provider: string,      // 'email' | 'google' | 'apple'
  plan: string,          // 'FREE' | 'PRO' | 'B2B'
  role: string,          // 'USER' | 'ADMIN'
  createdAt: timestamp,  // 생성일
  updatedAt: timestamp   // 수정일
}
```

## 플랜 상세

| 플랜 | 가격 | 주요 기능 |
|------|------|----------|
| FREE | ₩0 | 명함 1개, QR/NFC 공유, 기본 통계 |
| PRO | ₩2,900/월 | 명함 5개, 고급 디자인, 관계 관리, 팔로업 알림 |
| B2B Team | ₩5,000/인/월 | 브랜딩 템플릿, 일괄 발급, 팀 대시보드 |
| B2B Enterprise | 맞춤 견적 | 커스텀 도메인, CRM 연동, API 액세스 |

---

## 로고 파일 업로드

`public/zito_logo_2.png` 파일을 업로드해주세요.
- 권장 사이즈: 너비 200px 이상
- 형식: PNG (투명 배경 권장)
- 용도: 검정 헤더에 흰색 로고

현재는 로고 파일이 없을 경우 "Zito" 텍스트로 대체됩니다.

---

**Last Updated**: 2026-01-03
