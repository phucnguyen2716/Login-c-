// src/utils/SendOtpGmail.js
import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_9stx633';
const TEMPLATE_ID = 'template_5czbjo7';
const PUBLIC_KEY = 'f6W_TTzFDUhzThzlr';

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOtpToEmail(userEmail) {
  const otp = generateOTP();
  const templateParams = {
    to_email: userEmail,
    otp_code: otp,
    email: userEmail,
  };

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );
    console.log('Email sent:', response.status, response.text);
    return { success: true, otp };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, otp: null };
  }
}
