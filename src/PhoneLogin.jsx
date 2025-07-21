// src/components/pages/PhoneLogin.jsx
import React, { useState } from 'react';
import { auth } from '../../firebasePhoneNumber';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

export default function PhoneLogin() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            console.log('reCAPTCHA solved');
          },
        },
        auth
      );
    }
  };

  const sendOTP = () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((result) => {
        setConfirmationResult(result);
        alert('OTP sent!');
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
        alert('Failed to send OTP');
      });
  };

  const verifyOTP = () => {
    if (!confirmationResult) return alert("No confirmation result");

    confirmationResult.confirm(otp)
      .then((result) => {
        alert('Phone number verified successfully!');
        console.log(result.user);
      })
      .catch((error) => {
        console.error('OTP incorrect', error);
        alert('OTP incorrect!');
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login with Phone Number</h2>

      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+84xxxxxxxxx"
        style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
      />
      <button onClick={sendOTP} style={{ marginBottom: '20px' }}>Send OTP</button>

      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
      />
      <button onClick={verifyOTP}>Verify OTP</button>

      <div id="recaptcha-container"></div>
    </div>
  );
}
