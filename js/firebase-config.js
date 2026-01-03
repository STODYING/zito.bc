// Firebase Configuration
// Netlify 환경변수에서 가져옵니다 (빌드 시 주입됨)
// 로컬 개발 시에는 직접 값을 입력하거나, .env 파일 사용

const firebaseConfig = {
    apiKey: window.FIREBASE_API_KEY || "AIzaSyExample123456789",
    authDomain: window.FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
    projectId: window.FIREBASE_PROJECT_ID || "your-project-id",
    storageBucket: window.FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
    messagingSenderId: window.FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: window.FIREBASE_APP_ID || "1:123456789:web:abc123"
};

// Firebase 초기화
let app, auth, db;

function initializeFirebase() {
    try {
        // Firebase가 이미 초기화되었는지 확인
        if (firebase.apps.length === 0) {
            app = firebase.initializeApp(firebaseConfig);
        } else {
            app = firebase.apps[0];
        }
        auth = firebase.auth();
        db = firebase.firestore();
        
        console.log('✅ Firebase 초기화 완료');
        return true;
    } catch (error) {
        console.error('❌ Firebase 초기화 실패:', error);
        return false;
    }
}

// 페이지 로드 시 Firebase 초기화
document.addEventListener('DOMContentLoaded', () => {
    initializeFirebase();
});
