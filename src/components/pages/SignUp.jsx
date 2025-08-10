import React from 'react';
import './SignUp.css';

import InputField from "../InputField";
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();

  const handleSignInClick = (e) => {
    e.preventDefault(); // Ngăn submit nếu nằm trong form
    navigate('/sign-in'); // Chuyển hướng sang trang đăng nhập
  };

  return (
    <div className="login-container">
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h2 className="form-title">Create your account</h2>

      <form action="#" className="login-form">
        <div className="name-fields">
          <InputField type="text" placeholder="First Name" icon="user" />
          <InputField type="text" placeholder="Last Name" icon="user-tag" />
        </div>

        <InputField type="email" placeholder="Email address" icon="envelope" />
        <InputField type="tel" placeholder="Phone number" icon="phone" />
        <InputField type="password" placeholder="Password" icon="lock" />
        <InputField type="password" placeholder="Confirm Password" icon="lock" />

        <button type="button" className="login-button" onClick={handleSignInClick}>
          Sign Up
        </button>
      </form>

      <p className="signin-prompt">
        Already have an account? <Link to="/sign-in" className="signin-link">Log in</Link>
      </p>
    </div>
  );
}
