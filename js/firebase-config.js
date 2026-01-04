// Firebase Configuration - Netlify 빌드 시 실제 값으로 치환됩니다.

const firebaseConfig = {
  apiKey: "process.env.REACT_APP_FIREBASE_API_KEY",
  appId: "process.env.REACT_APP_FIREBASE_APP_ID",
  authDomain: "process.env.REACT_APP_FIREBASE_AUTH_DOMAIN",
  messagingSenderId: "process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
  projectId: "process.env.REACT_APP_FIREBASE_PROJECT_ID",
  storageBucket: "process.env.REACT_APP_FIREBASE_STORAGE_BUCKET"
};

// 전역 변수 선언
let app, auth, db;

function initializeFirebase() {
    try {
        if (typeof firebase === 'undefined') {
            throw new Error('Firebase SDK가 로드되지 않았습니다.');
        }

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
