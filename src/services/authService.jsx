import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

// Google config
import { auth, db as dbGoogle, googleProvider } from "../firebaseGoogle";
// GitHub config
import { authGitHub, db as dbGitHub, githubProvider } from "../firebaseGitHub";

const saveUserToFirestore = async (user, providerName, dbInstance) => {
  const userRef = doc(dbInstance, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      fullname: user.displayName || "No name",
      email: user.email || "No email",
      photoURL: user.photoURL || "",
      provider: providerName,
      createdAt: serverTimestamp(),
      role: "participant"
    });
    console.log(" User saved to Firestore");
  } else {
    console.log("User already exists in Firestore");
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    await saveUserToFirestore(user, "google", dbGoogle);
    console.log("Google login success:", user.email);
    return user;
  } catch (error) {
    if (error.code === "auth/account-exists-with-different-credential") {
      alert("Email này đã đăng nhập bằng GitHub. Vui lòng dùng GitHub để đăng nhập.");
    }
    console.error("Google login error:", error);
    throw error;
  }
};

export const loginWithGitHub = async () => {
  try {
    const result = await signInWithPopup(authGitHub, githubProvider);
    const user = result.user;
    await saveUserToFirestore(user, "github", dbGitHub);
    console.log("GitHub login success:", user.email);
    return user;
  } catch (error) {
    if (error.code === "auth/operation-not-allowed") {
      alert("GitHub chưa được bật trong Firebase Console.");
    }
    if (error.code === "auth/account-exists-with-different-credential") {
      alert("Email này đã đăng nhập bằng Google. Vui lòng dùng Google để đăng nhập.");
    }
    console.error("GitHub login error:", error);
    throw error;
  }
};
