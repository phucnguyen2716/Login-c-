import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfigGoogle = {
  apiKey: "AIzaSyAOKDqan_mWyhyWKx-IKUxQNjCaij6T7tA",
  authDomain: "authentication-787d3.firebaseapp.com",
  projectId: "authentication-787d3",
  storageBucket: "authentication-787d3.firebasestorage.app",
  messagingSenderId: "666146893631",
  appId: "1:666146893631:web:7c857fc8c52cc84378ad8a",
  measurementId: "G-EKXXKEZPT3"
};

const appGoogle = initializeApp(firebaseConfigGoogle, "GoogleApp");
const auth = getAuth(appGoogle);
const db = getFirestore(appGoogle);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
