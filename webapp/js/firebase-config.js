// Firebase Configuration
// 환경변수는 Netlify 관리자 페이지에서 설정합니다.
// 로컬 개발 시에는 이 파일의 값을 직접 입력하거나, 
// window.ENV 객체를 통해 설정할 수 있습니다.

const firebaseConfig = {
    apiKey: window.ENV?.FIREBASE_API_KEY || "YOUR_FIREBASE_API_KEY",
    authDomain: window.ENV?.FIREBASE_AUTH_DOMAIN || "YOUR_PROJECT.firebaseapp.com",
    projectId: window.ENV?.FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
    storageBucket: window.ENV?.FIREBASE_STORAGE_BUCKET || "YOUR_PROJECT.appspot.com",
    messagingSenderId: window.ENV?.FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
    appId: window.ENV?.FIREBASE_APP_ID || "YOUR_APP_ID"
};

// Initialize Firebase
let app, auth, db;

try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    console.log('✅ Firebase 초기화 성공');
} catch (error) {
    console.error('❌ Firebase 초기화 실패:', error);
}

// Google Auth Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

// Apple Auth Provider
const appleProvider = new firebase.auth.OAuthProvider('apple.com');
appleProvider.addScope('email');
appleProvider.addScope('name');
