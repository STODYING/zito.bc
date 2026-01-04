// Netlify 빌드 시 실제 값으로 치환되는 영역입니다.
const firebaseConfig = {
    apiKey: "process.env.REACT_APP_FIREBASE_API_KEY",
    authDomain: "process.env.REACT_APP_FIREBASE_AUTH_DOMAIN",
    projectId: "process.env.REACT_APP_FIREBASE_PROJECT_ID",
    storageBucket: "process.env.REACT_APP_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
    appId: "process.env.REACT_APP_FIREBASE_APP_ID"
};

// 전역 변수로 설정하여 다른 파일(app.js 등)에서 접근 가능하게 함
window.firebaseConfig = firebaseConfig;

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("✅ Firebase 초기화 완료 (환경 변수 주입 확인 필요)");
}
