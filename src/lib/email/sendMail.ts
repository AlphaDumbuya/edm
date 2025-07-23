import nodemailer from 'nodemailer';

console.log('[SMTP DEBUG]', {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD ? '***' : undefined,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendMail({ to, subject, html, text }: { to: string; subject: string; html: string; text: string }) {
  await transporter.sendMail({
    from: `${process.env.EMAIL_FROM_NAME || 'EDM'} <${process.env.ADMIN_EMAIL || process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    text,
  });
}
