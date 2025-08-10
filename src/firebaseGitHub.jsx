import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfigGitHub = {
  apiKey: "AIzaSyBKSyEzlb8McI1jbb3S-F-pCE4oQHZciSY",
  authDomain: "authentication-606a9.firebaseapp.com",
  projectId: "authentication-606a9",
  storageBucket: "authentication-606a9.firebasestorage.app",
  messagingSenderId: "813575447927",
  appId: "1:813575447927:web:da034b8dbb315356fbed72",
  measurementId: "G-NZM7T432BC"
};

const appGitHub = initializeApp(firebaseConfigGitHub, "GitHubApp");
const authGitHub = getAuth(appGitHub);
const db = getFirestore(appGitHub); 

const githubProvider = new GithubAuthProvider();

export { authGitHub, githubProvider, db }; 