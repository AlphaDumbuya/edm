import nodemailer from 'nodemailer';

interface SendPrayerToRequesterOptions {
  to: string;
  toName?: string;
  prayerText: string;
  from?: string;
}

function getPrayerPreview(prayerText: string) {
  // Get a short preview for the subject (max 40 chars)
  return prayerText.length > 40 ? prayerText.slice(0, 37) + '...' : prayerText;
}

export async function sendPrayerToRequester({ to, toName, prayerText, from }: SendPrayerToRequesterOptions) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const preview = getPrayerPreview(prayerText.replace(/\n/g, ' '));
  const subject = toName
    ? `A personal prayer for you, ${toName} — \"${preview}\"`
    : `A personal prayer for you — \"${preview}\"`;

  const greeting = toName ? `Hi <strong>${toName}</strong>,` : 'Hello,';
  const sender = from ? `<p style='margin-top:16px; color:#003366;'><strong>Prayer from:</strong> ${from}</p>` : '';

  // Standard EDM template (logo, card, colors)
  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f6f8fa; padding: 0; margin: 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f6f8fa; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); overflow: hidden;">
              <tr>
                <td style="background: #003366; padding: 32px 0; text-align: center;">
                  <img src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width="120" style="display: block; margin: 0 auto 12px; border-radius: 8px;" />
                  <h1 style="color: #fff; font-size: 2rem; margin: 0; font-weight: 700; letter-spacing: 1px;">You Have Been Prayed For</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 32px 40px 24px 40px;">
                  <p style="font-size: 1.1rem; color: #222; margin-bottom: 18px;">${greeting}</p>
                  <p style="font-size: 1.05rem; color: #333; margin-bottom: 18px;">Someone has just prayed for your request on the <strong>EDM Prayer Wall</strong>. Here is their prayer for you:</p>
                  <table style="margin: 24px 0 32px 0; width: 100%; background: #f0f4f8; border-radius: 8px;">
                    <tr><td style="padding: 18px 24px; font-size: 1.08rem; color: #003366;"><em>“${prayerText}”</em></td></tr>
                  </table>
                  ${sender}
                  <p style="font-size: 1rem; color: #222; margin-top: 24px;">May you be encouraged and blessed!<br/>With love,<br/><strong>EDM Prayer Team</strong></p>
                </td>
              </tr>
              <tr>
                <td style="background: #f0f4f8; text-align: center; padding: 18px 0; color: #888; font-size: 0.95rem; border-top: 1px solid #e0e6ed;">
                  &copy; ${new Date().getFullYear()} Evangelical Diaspora Mission. All rights reserved.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;

  const text = `Hi${toName ? ' ' + toName : ''},\n\nSomeone has just prayed for your request on the EDM Prayer Wall.\n\nTheir prayer for you:\n\n"${prayerText}"\n${from ? '\nPrayer from: ' + from : ''}\n\nMay you be encouraged and blessed!\n\n— EDM Prayer Team\nEvangelical Diaspora Mission`;

  await transporter.sendMail({
    from: `${process.env.EMAIL_FROM_NAME || 'EDM Team'} <${process.env.ADMIN_EMAIL}>`,
    to,
    subject,
    html,
    text,
    replyTo: from || process.env.ADMIN_EMAIL,
  });
}
