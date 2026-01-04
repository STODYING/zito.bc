// Firebase Configuration - 빌드 시 실제 값으로 치환됩니다.
const firebaseConfig = {
    apiKey: "AIzaSyExample123456789",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:704514531976:web:e72e93066eb83b93ad353d"
};

// 전역 변수 선언 (auth.js에서 사용할 수 있도록 window 객체에 할당)
let auth;

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    // 이 줄이 핵심입니다! auth 변수를 정의합니다.
    auth = firebase.auth(); 
    window.auth = auth; // 다른 파일(auth.js 등)에서 인식할 수 있게 전역으로 보냅니다.
    console.log("✅ Firebase 초기화 및 Auth 객체 생성 완료");
}
