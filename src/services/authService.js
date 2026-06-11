import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  EmailAuthProvider
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { Capacitor } from "@capacitor/core";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

const googleProvider = new GoogleAuthProvider();

export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signup = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  if (Capacitor.isNativePlatform()) {
    await FirebaseAuthentication.signOut().catch(console.error);
  }
  return await signOut(auth);
};

export const resetPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};

export const signInWithGoogle = async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      const result = await FirebaseAuthentication.signInWithGoogle();
      console.log("[DEBUG] FirebaseAuthentication.signInWithGoogle() result:", JSON.stringify(result, null, 2));
      
      const credential = GoogleAuthProvider.credential(result.credential?.idToken);
      const authResult = await signInWithCredential(auth, credential);
      console.log("[DEBUG] signInWithCredential() result:", authResult);
      
      return authResult;
    } catch (error) {
      console.error("[DEBUG] Error inside signInWithGoogle native block:", error);
      throw error;
    }
  } else {
    return await signInWithPopup(auth, googleProvider);
  }
};

export { fetchSignInMethodsForEmail, linkWithCredential, EmailAuthProvider, auth };
