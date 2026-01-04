// Netlify 빌드 시 실제 값으로 바뀝니다.
const firebaseConfig = {
    apiKey: window.FIREBASE_API_KEY,
    authDomain: window.FIREBASE_AUTH_DOMAIN,
    projectId: window.FIREBASE_PROJECT_ID,
    storageBucket: window.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: window.FIREBASE_MESSAGING_SENDER_ID,
    appId: window.FIREBASE_APP_ID
};

// 전역 객체 등록
window.firebaseConfig = firebaseConfig;

if (typeof firebase !== 'undefined' && firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase 초기화 완료');
}
