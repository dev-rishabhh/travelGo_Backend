import nodemailer from "nodemailer"

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "rishabhpandey2963@gmail.com",
    pass: process.env.OTP_SERVICE_SECRET,
  },
});

// Wrap in an async IIFE so we can use await.
export async function sendOtp (to,text) {
  const info = await transporter.sendMail({
    from: '"Rishabh " <rishabhpandey2963@gmail.com>',
    to,
    subject: "OTP for Registration",
    text,
  });
  return info.messageId;
}