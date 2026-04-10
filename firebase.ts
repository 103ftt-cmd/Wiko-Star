import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: "gen-lang-client-0606323378",
  appId: "1:482504385689:web:3fb656ec9d1358fa108408",
  apiKey: "AIzaSyAmC_-oFZaFQI-adkA8YSn97cGTW2j5F_w",
  authDomain: "gen-lang-client-0606323378.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-b8198c41-cc84-4066-96d4-0e36a0287946",
  storageBucket: "gen-lang-client-0606323378.firebasestorage.app",
  messagingSenderId: "482504385689"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export const signIn = () => signInWithPopup(auth, googleProvider);
export const signOut = () => auth.signOut();
