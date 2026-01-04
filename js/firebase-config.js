// Firebase Configuration - Netlify 빌드 시 실제 값으로 바뀝니다.
const firebaseConfig = {
  apiKey: "process.env.REACT_APP_FIREBASE_API_KEY",
  appId: "process.env.REACT_APP_FIREBASE_APP_ID",
  authDomain: "process.env.REACT_APP_FIREBASE_AUTH_DOMAIN",
  messagingSenderId: "process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
  projectId: "process.env.REACT_APP_FIREBASE_PROJECT_ID",
  storageBucket: "process.env.REACT_APP_FIREBASE_STORAGE_BUCKET"
};

let app, auth, db;

function initializeFirebase() {
    try {
        if (typeof firebase !== 'undefined' && firebase.apps.length === 0) {
            app = firebase.initializeApp(firebaseConfig);
            auth = firebase.auth();
            db = firebase.firestore();
            console.log('✅ Firebase 초기화 완료');
        }
    } catch (error) {
        console.error('❌ Firebase 초기화 실패:', error);
    }
}

// 즉시 실행
initializeFirebase();
