// Brevo transactional email sender for serverless/Next.js API routes
// Usage: await sendBrevoEmail({ to, subject, html, text })

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_SENDER_EMAIL = process.env.ADMIN_EMAIL;
const BREVO_SENDER_NAME = process.env.EMAIL_FROM_NAME || 'EDM';

export async function sendBrevoEmail({ to, subject, html, text }: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': BREVO_API_KEY || '',
    },
    body: JSON.stringify({
      sender: { email: BREVO_SENDER_EMAIL, name: BREVO_SENDER_NAME },
      to: [{ email: to }],
      subject,
      htmlContent: html,
      textContent: text || '',
    }),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Brevo email failed: ${error}`);
  }
  return await res.json();
}
