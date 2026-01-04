// Firebase Configuration - 빌드 시 실제 값으로 치환됩니다.
const firebaseConfig = {
    apiKey: "AIzaSyExample123456789",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:704514531976:web:e72e93066eb83b93ad353d"
};

// 전역 변수 선언
let auth;
let db;

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    
    // Auth 객체 생성
    auth = firebase.auth();
    window.auth = auth;
    
    // DB(Firestore) 객체 생성 - 이 부분이 추가되어야 에러가 사라집니다.
    db = firebase.firestore();
    window.db = db;
    
    console.log("✅ Firebase 초기화, Auth 및 DB 객체 생성 완료");
}
