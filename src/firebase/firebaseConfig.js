import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDdluyClUswF1JCJQhlMXr01qi6Sy6jAi0",
    authDomain: "gigpath.firebaseapp.com",
    projectId: "gigpath",
    storageBucket: "gigpath.firebasestorage.app",
    messagingSenderId: "594068319655",
    appId: "1:594068319655:web:6c068158465e6a54ad1a82",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;