import React from 'react';
import './SignIn.css';

import SocialLogin from "../SocialLogin";
import InputField from "../InputField";
import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <div className="login-container">
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h2 className="form-title">Log in with</h2>
      <SocialLogin />

      <p className="separator"><span>or</span></p>

      <form action="#" className="login-form">
        <InputField type="email" placeholder="Email address" icon="envelope" />
        <InputField type="password" placeholder="Password" icon="lock" />

        <Link to="/forgot-password" className="forgot-password-link">
          Forgot password?
        </Link>
        <button type="submit" className="login-button">Log In</button>
      </form>

      <p className="signin-prompt">
        Don&apos;t have an account?<Link to="/sign-up" className="signin-link">Sign up</Link>
      </p>

    </div>
  );
}
