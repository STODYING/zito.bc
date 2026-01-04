// Netlify 환경 변수에서 가져옵니다
const firebaseConfig = {
  apiKey: "process.env.REACT_APP_FIREBASE_API_KEY",
  appId: "process.env.REACT_APP_FIREBASE_APP_ID",
  authDomain: "process.env.REACT_APP_FIREBASE_AUTH_DOMAIN",
  messagingSenderId: "process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
  projectId: "process.env.REACT_APP_FIREBASE_PROJECT_ID",
  storageBucket: "process.env.REACT_APP_FIREBASE_STORAGE_BUCKET"
};

// 전역 윈도우 객체에 할당하여 어디서든 접근 가능하게 함
window.firebaseConfig = firebaseConfig;

if (typeof firebase !== 'undefined' && firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase 초기화 완료');
}
