import nodemailer from 'nodemailer';
import twilio from 'twilio';

// Email service
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Twilio client
const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export async function sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: email,
        subject: 'Verify your email address',
        html: `
      <h1>Email Verification</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>This link will expire in 24 hours.</p>
    `,
    };

    await transporter.sendMail(mailOptions);
}

export async function sendOTP(phoneNumber: string, otp: string) {
    await twilioClient.messages.create({
        body: `Your Barter Adverts verification code is: ${otp}. This code will expire in 10 minutes.`,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER,
    });
}

export function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateEmailToken(): string {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

export function getExpiryTime(minutes: number): Date {
    return new Date(Date.now() + minutes * 60 * 1000);
} 