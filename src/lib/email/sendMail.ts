import { emailService } from './emailService';

export async function sendMail({ to, subject, html, text }: { to: string; subject: string; html: string; text: string }) {
  await emailService.sendMail({
    from: `${process.env.EMAIL_FROM_NAME || 'EDM'} <${process.env.ADMIN_EMAIL || process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    text,
  });
}
