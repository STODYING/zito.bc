// Firebase 설정 - 환경변수 사용 (Netlify에서 설정)
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    OAuthProvider,
    User
} from 'firebase/auth';
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc, 
    updateDoc,
    serverTimestamp 
} from 'firebase/firestore';

// Firebase 설정 - Netlify 환경변수에서 가져옴
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ''
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Google 프로바이더
const googleProvider = new GoogleAuthProvider();

// Apple 프로바이더
const appleProvider = new OAuthProvider('apple.com');
appleProvider.addScope('email');
appleProvider.addScope('name');

// 사용자 타입 정의
export interface ZitoUser {
    uid: string;
    email: string;
    name: string;
    provider: string;
    plan: 'FREE' | 'PRO' | 'B2B';
    role: 'USER' | 'ADMIN';
    createdAt?: any;
    updatedAt?: any;
}

// Firestore에 사용자 정보 저장
async function saveUserToFirestore(
    uid: string, 
    email: string, 
    name: string, 
    provider: string
): Promise<void> {
    const userRef = doc(db, 'users', uid);
    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
        await updateDoc(userRef, {
            updatedAt: serverTimestamp()
        });
    } else {
        await setDoc(userRef, {
            uid,
            email,
            name,
            provider,
            plan: 'FREE',
            role: 'USER',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
    }
}

// 사용자 정보 가져오기
export async function getUserData(uid: string): Promise<ZitoUser | null> {
    try {
        const userRef = doc(db, 'users', uid);
        const snapshot = await getDoc(userRef);
        if (snapshot.exists()) {
            return snapshot.data() as ZitoUser;
        }
        return null;
    } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
        return null;
    }
}

// 이메일 회원가입
export async function signUpWithEmail(
    name: string, 
    email: string, 
    password: string
): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await saveUserToFirestore(user.uid, email, name, 'email');
    
    console.log('이메일 회원가입 성공:', email);
    return user;
}

// 이메일 로그인
export async function signInWithEmail(
    email: string, 
    password: string
): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('이메일 로그인 성공:', userCredential.user.email);
    return userCredential.user;
}

// Google 로그인
export async function signInWithGoogle(): Promise<User> {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    await saveUserToFirestore(
        user.uid,
        user.email || '',
        user.displayName || 'Google 사용자',
        'google'
    );

    console.log('Google 로그인 성공:', user.email);
    return user;
}

// Apple 로그인
export async function signInWithApple(): Promise<User> {
    const result = await signInWithPopup(auth, appleProvider);
    const user = result.user;

    await saveUserToFirestore(
        user.uid,
        user.email || '',
        user.displayName || 'Apple 사용자',
        'apple'
    );

    console.log('Apple 로그인 성공:', user.uid);
    return user;
}

// 로그아웃
export async function logOut(): Promise<void> {
    await signOut(auth);
    console.log('로그아웃 성공');
}

// 인증 상태 변경 리스너
export function onAuthChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
}

// 현재 사용자 가져오기
export function getCurrentUser(): User | null {
    return auth.currentUser;
}
