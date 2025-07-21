import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { loginWithGoogle, loginWithGitHub } from "../services/authService";

const SocialLogin = () => {
  const handleLogin = async (provider) => {
    try {
      if (provider === "google") {
        await loginWithGoogle();
      } else if (provider === "github") {
        await loginWithGitHub();
      }
    } catch (error) {
      console.error(`${provider} login failed:`, error);
    }
  };

  return (
    <div className="social-login">
      <button className="social-button" onClick={() => handleLogin("google")}>
        <img src="/google.svg" alt="Google" className="social-icon" />
        Google
      </button>

      <button className="social-button" onClick={() => handleLogin("github")}>
        <i className="fab fa-github fa-2x social-icon"></i>
        GitHub
      </button>
    </div>
  );
};

export default SocialLogin;
