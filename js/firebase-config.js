// Firebase Configuration - 빌드 시 실제 값으로 치환됩니다.
const firebaseConfig = {
    apiKey: "AIzaSyExample123456789",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};

// 전역 초기화
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("✅ Firebase 초기화 완료");
}
