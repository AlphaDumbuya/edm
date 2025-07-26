import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  console.log('Email Configuration:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    fromName: process.env.EMAIL_FROM_NAME,
    fromAddress: process.env.EMAIL_FROM
  });
  console.log('Attempting to send email:', {
    to,
    subject,
    text: text.substring(0, 100) + '...' // Log first 100 chars of text
  });
  try {
    const info = await transporter.sendMail({
      from: {
        name: process.env.EMAIL_FROM_NAME || 'EDM',
        address: process.env.EMAIL_FROM || 'noreply@edm.org'
      },
      to,
      subject,
      text,
      html
    });

    console.log(`Email sent successfully to ${to}. Message ID: ${info.messageId}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send email: ${error instanceof Error ? error.message : String(error)}`);
  }
}
