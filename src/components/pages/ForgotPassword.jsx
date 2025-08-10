import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import { auth } from '../../firebasePhoneNumber';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { sendOtpToEmail } from './SendOtpGmail';

export default function ForgotPassword() {
  const [method, setMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.hostname === 'localhost') {
      auth.settings.appVerificationDisabledForTesting = true;
    }
  }, []);

  const showMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const sendOTP = async () => {
    if (method === 'email') {
      if (!email || !email.includes('@')) {
        showMessage('Please enter a valid email.', 'error');
        return;
      }

      const { success, otp } = await sendOtpToEmail(email);
      if (success) {
        setGeneratedOtp(otp);
        showMessage('OTP has been sent to your email!');
      } else {
        showMessage('Failed to send OTP via email.', 'error');
      }
    }

    if (method === 'sms') {
      let cleanPhone = phone.trim();
      if (!/^[0-9]{9,10}$/.test(cleanPhone)) {
        showMessage('Please enter a valid phone number.', 'error');
        return;
      }

      if (cleanPhone.startsWith('0')) {
        cleanPhone = cleanPhone.substring(1);
      }

      const fullPhone = '+84' + cleanPhone;

      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
      }

      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {},
        'expired-callback': () => {
          showMessage('reCAPTCHA expired. Please try again.', 'error');
        },
      });

      const appVerifier = window.recaptchaVerifier;

      signInWithPhoneNumber(auth, fullPhone, appVerifier)
        .then((result) => {
          setConfirmationResult(result);
          showMessage('OTP has been sent via SMS!');
        })
        .catch((error) => {
          console.error('Failed to send OTP:', error);
          showMessage('Failed to send OTP. Please check the phone number.', 'error');
        });
    }
  };

  const verifyOTP = () => {
    if (method === 'email') {
      if (otp === generatedOtp) {
        showMessage('OTP verified successfully!');
        setTimeout(() => {
          navigate('/reset-password', { state: { email } });
        }, 1000);
      } else {
        showMessage('Invalid OTP.', 'error');
      }
    }

    if (method === 'sms') {
      if (!confirmationResult) {
        showMessage('Please send OTP first.', 'error');
        return;
      }

      confirmationResult
        .confirm(otp)
        .then((result) => {
          showMessage('Verification successful!');
          setTimeout(() => {
            navigate('/reset-password', { state: { phone } });
          }, 1000);
        })
        .catch(() => {
          showMessage('Invalid OTP. Please try again.', 'error');
        });
    }
  };

  return (
    <div className="login-container">
      <h2 className="form-title">Forgot Password</h2>
      <video src="/videos/video-1.mp4" autoPlay loop muted />

      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <div className="method-selector">
          <label className={`radio-label ${method === 'email' ? 'selected' : ''}`}>
            <input
              type="radio"
              value="email"
              checked={method === 'email'}
              onChange={() => setMethod('email')}
              className="radio-input"
            />
            <i className="fas fa-envelope"></i>
            <span>Email</span>
          </label>

          <label className={`radio-label ${method === 'sms' ? 'selected' : ''}`}>
            <input
              type="radio"
              value="sms"
              checked={method === 'sms'}
              onChange={() => setMethod('sms')}
              className="radio-input"
            />
            <i className="fas fa-phone"></i>
            <span>SMS</span>
          </label>
        </div>

        {method === 'email' && (
          <div className="input-wrapper">
            <input
              type="email"
              className="input-field"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="fas fa-envelope"></i>
          </div>
        )}

        {method === 'sms' && (
          <div className="input-wrapper phone-group">
            <input type="text" value="+84" readOnly className="country-code-input" />
            <input
              type="tel"
              className="input-field"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              maxLength={10}
              required
              style={{ paddingLeft: '1rem' }}
            />
            <i className="fas fa-phone"></i>
          </div>
        )}

        <button type="button" className="login-button" onClick={sendOTP}>
          Send OTP
        </button>

        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <i className="fas fa-key"></i>
        </div>

        <button type="button" className="login-button" onClick={verifyOTP}>
          Verify OTP
        </button>

        {message && <div className={`message ${messageType}`}>{message}</div>}

        <p className="signin-prompt" style={{ marginTop: '1.5rem' }}>
          Remember your password?{' '}
          <Link to="/sign-in" className="signin-link">
            Sign in
          </Link>
        </p>
      </form>

      <div id="recaptcha-container"></div>
    </div>
  );
}
