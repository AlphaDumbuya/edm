// src/emails/verification-template.ts

export function getVerificationEmailHtml({ name, verificationUrl }: { name: string, verificationUrl: string }) {
  return `
  <div style="background:#f6f8fa;padding:40px 0;font-family:sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:auto;background:#fff;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.07);overflow:hidden;">
      <tr>
        <td style="background:#0e1a2b;padding:32px 0;text-align:center;">
          <img src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" style="width:80px;height:80px;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.12);margin-bottom:12px;" />
          <h1 style="color:#fff;font-size:2rem;margin:0;letter-spacing:2px;">Evangalish Discipleship Missions</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:40px 32px 32px 32px;">
          <h2 style="color:#0e1a2b;font-size:1.5rem;margin-bottom:12px;">Verify your email address</h2>
          <p style="color:#333;font-size:1rem;line-height:1.6;margin-bottom:24px;">Hi <b>${name}</b>,<br><br>Thank you for joining <b>Evangalish Discipleship Missions</b>! Please confirm your email address to activate your account and get started.<br><br><span style='color:#0e1a2b;font-weight:bold;'>Why verify?</span> Verifying your email helps us keep your account secure and ensures you receive important updates and opportunities from our mission community.</p>
          <a href="${verificationUrl}" style="display:inline-block;padding:14px 32px;background:#0e1a2b;color:#fff;font-weight:bold;border-radius:6px;text-decoration:none;font-size:1.1rem;letter-spacing:1px;box-shadow:0 2px 8px rgba(0,0,0,0.10);">Verify Email</a>
          <p style="color:#888;font-size:0.95rem;margin-top:32px;">If you did not create this account, you can safely ignore this email.<br>Need help? Contact us at <a href="mailto:contact@edmmission.org" style="color:#0e1a2b;text-decoration:underline;">contact@edmmission.org</a>.</p>
        </td>
      </tr>
      <tr>
        <td style="background:#f6f8fa;padding:24px 0;text-align:center;color:#aaa;font-size:0.9rem;">&copy; ${new Date().getFullYear()} Evangalish Discipleship Missions. All rights reserved.</td>
      </tr>
    </table>
  </div>
  `;
}
