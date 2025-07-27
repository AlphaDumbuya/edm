
import { sendBrevoEmail } from './sendBrevoEmail';

export async function sendEventRegistrationEmail({ name, email, event }: { name: string; email: string; event: any }) {
  // Calculate time until event (in minutes) using UTC
  const eventDate = new Date(event.date + 'T' + event.time + '+00:00');
  const now = new Date();
  const timeDiffMinutes = Math.floor((eventDate.getTime() - now.getTime()) / 60000);

  // Format time in am/pm
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  // Determine if event is close (<= 60 min or <= 30 min)
  const includeLink = event.isVirtual === 'true' || event.isVirtual === true ? (timeDiffMinutes <= 60) : false;

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.ADMIN_EMAIL}>`,
    to: email,
    subject: `Registration Confirmation for ${event.title}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f6f8fa; padding: 0; margin: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #f6f8fa; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); overflow: hidden;">
                <tr>
                  <td style="background: #003366; padding: 32px 0; text-align: center;">
                    <img src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width="120" style="display: block; margin: 0 auto 12px; border-radius: 8px;" />
                    <h1 style="color: #fff; font-size: 2rem; margin: 0; font-weight: 700; letter-spacing: 1px;">Event Registration Confirmed</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 32px 40px 24px 40px;">
                    <p style="font-size: 1.1rem; color: #222; margin-bottom: 18px;">Hi <strong>${name}</strong>,</p>
                    <p style="font-size: 1.05rem; color: #333; margin-bottom: 18px;">Thank you for registering for <strong>${event.title}</strong>!</p>
                    <table style="margin: 24px 0 32px 0; width: 100%; background: #f0f4f8; border-radius: 8px;">
                      <tr><td style="padding: 12px 18px; font-size: 1rem; color: #003366;"><strong>Date:</strong> ${new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td></tr>
                      <tr><td style="padding: 12px 18px; font-size: 1rem; color: #003366;"><strong>Time:</strong> ${formattedTime} (${event.timezone || 'UTC'})</td></tr>
                      ${event.isVirtual === 'true' || event.isVirtual === true
                        ? includeLink
                          ? `<tr><td style="padding: 12px 18px; font-size: 1rem; color: #0077cc;"><strong>Type:</strong> Online Event</td></tr><tr><td style="padding: 12px 18px; font-size: 1rem; color: #0077cc;"><strong>Join Link:</strong> <a href="${event.onlineLink}">${event.onlineLink}</a></td></tr>`
                          : `<tr><td style="padding: 12px 18px; font-size: 1rem; color: #0077cc;"><strong>Type:</strong> Online Event</td></tr><tr><td style="padding: 12px 18px; font-size: 1rem; color: #0077cc;"><em>The join link will be sent in a reminder email before the event.</em></td></tr>`
                        : `<tr><td style="padding: 12px 18px; font-size: 1rem; color: #003366;"><strong>Location:</strong> ${event.location}</td></tr>`}
                    </table>
                    <div style="font-size: 1rem; color: #444; margin-bottom: 24px;">${event.description ? event.description : ''}</div>
                    <p style="font-size: 1rem; color: #222;">We look forward to seeing you at the event!<br/>Blessings,<br/><strong>EDM Team</strong></p>
                  </td>
                </tr>
                <tr>
                  <td style="background: #f0f4f8; text-align: center; padding: 18px 0; color: #888; font-size: 0.95rem; border-top: 1px solid #e0e6ed;">
                    &copy; ${new Date().getFullYear()} Evangelism Discipleship Mission. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `,
    text: `Thank you for registering for ${event.title}!\n\nHi ${name},\nYour registration for ${event.title} is confirmed.\nDate: ${new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\nTime: ${formattedTime} (${event.timezone || 'UTC'})\n${event.isVirtual === 'true' || event.isVirtual === true
      ? includeLink
        ? `Type: Online Event\nJoin Link: ${event.onlineLink}`
        : `Type: Online Event. The join link will be sent in a reminder email before the event.`
      : `Location: ${event.location}`}\nWe look forward to seeing you!\n\nEDM Team\nEvangelism Discipleship Mission`,
  };
  try {
    await sendBrevoEmail({
      to: email,
      subject: mailOptions.subject,
      html: mailOptions.html,
      text: mailOptions.text,
    });
  } catch (error) {
    console.error('sendEventRegistrationEmail error:', error);
    console.error('Email input:', { name, email, event });
    throw error;
  }
}
