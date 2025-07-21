import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import InputField from '../InputField';
import './ResetPassword.css'; 

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  const phone = location.state?.phone || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const showMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      showMessage('Please fill in all fields.', 'error');
      return;
    }

    if (!isPasswordStrong(password)) {
      showMessage('Password is not strong enough.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showMessage('Passwords do not match.', 'error');
      return;
    }

    // TODO: Gửi password mới lên server/Firebase
    showMessage('Password reset successful!');
    setTimeout(() => {
      navigate('/sign-in');
    }, 1500);
  };

  const isPasswordStrong = (pwd) => {
    return (
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&
      /[a-z]/.test(pwd) &&
      /\d/.test(pwd) &&
      /[^A-Za-z0-9]/.test(pwd)
    );
  };

  const passwordRules = [
    { test: (pwd) => pwd.length >= 8, label: 'At least 8 characters' },
    { test: (pwd) => /[A-Z]/.test(pwd), label: 'At least one uppercase letter' },
    { test: (pwd) => /[a-z]/.test(pwd), label: 'At least one lowercase letter' },
    { test: (pwd) => /\d/.test(pwd), label: 'At least one number' },
    { test: (pwd) => /[^A-Za-z0-9]/.test(pwd), label: 'At least one special character' },
  ];

  return (
    <div className="login-container">
      <h2 className="form-title">Reset Password</h2>
      <video src="/videos/video-1.mp4" autoPlay loop muted />

      <form className="login-form" onSubmit={handleSubmit}>
        {(email || phone) && (
          <p className="reset-info">
            You're resetting the password for <strong>{email || '+84 ' + phone}</strong>
          </p>
        )}

        <InputField
          type="password"
          placeholder="New Password"
          icon="key"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ✅ Hiện điều kiện ngay dưới ô mật khẩu */}
        <ul className="password-rules">
          {passwordRules.map((rule, index) => (
            <li key={index} className={rule.test(password) ? 'rule-valid' : 'rule-invalid'}>
              {rule.test(password) ? '✔️' : '❌'} {rule.label}
            </li>
          ))}
        </ul>

        <InputField
          type="password"
          placeholder="Confirm New Password"
          icon="lock-open"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit" className="login-button">
          Reset Password
        </button>

        {message && <div className={`message ${messageType}`}>{message}</div>}

        <p className="signin-prompt" style={{ marginTop: '1.5rem' }}>
          Back to{' '}
          <Link to="/sign-in" className="signin-link">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
