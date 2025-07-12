// src/emails/volunteer-confirmation.ts

export function volunteerConfirmationEmail({ name, email, phone, areasOfInterest, availability, message }: {
  name: string;
  email: string;
  phone?: string;
  areasOfInterest: string[];
  availability: string;
  message?: string;
}) {
  return {
    subject: 'Thank You for Volunteering with EDM!',
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f6f8fa; padding: 0; margin: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #f6f8fa; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); overflow: hidden;">
                <tr>
                  <td style="background: #003366; padding: 32px 0; text-align: center;">
                    <img src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width="120" style="display: block; margin: 0 auto 12px; border-radius: 8px;" />
                    <h1 style="color: #fff; font-size: 2rem; margin: 0; font-weight: 700; letter-spacing: 1px;">Thank You for Volunteering!</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 32px 40px 24px 40px;">
                    <p style="font-size: 1.1rem; color: #222; margin-bottom: 18px;">Hi <strong>${name}</strong>,</p>
                    <p style="font-size: 1.1rem; color: #222; margin-bottom: 18px;">
                      We are thrilled to receive your interest in volunteering with <strong>Evangelism Discipleship Missions (EDM)</strong>.
                      Your willingness to serve is a blessing to our mission and the communities we support.
                    </p>
                    <div style="margin: 32px 0 24px 0;">
                      <h2 style="font-size: 1.15rem; color: #003366; margin-bottom: 10px;">Your Volunteer Submission</h2>
                      <table cellpadding="0" cellspacing="0" style="width: 100%; background: #f4f7fb; border-radius: 8px; padding: 16px; font-size: 1rem; color: #222;">
                        <tr><td style="padding: 6px 0;"><strong>Name:</strong></td><td>${name}</td></tr>
                        <tr><td style="padding: 6px 0;"><strong>Email:</strong></td><td>${email}</td></tr>
                        ${phone ? `<tr><td style=\"padding: 6px 0;\"><strong>Phone:</strong></td><td>${phone}</td></tr>` : ''}
                        <tr><td style="padding: 6px 0;"><strong>Areas of Interest:</strong></td><td>${areasOfInterest && areasOfInterest.length > 0 ? areasOfInterest.map(i => `<span style='background:#e0e7ef; border-radius:4px; padding:2px 8px; margin-right:4px;'>${i}</span>`).join('') : 'N/A'}</td></tr>
                        <tr><td style="padding: 6px 0;"><strong>Availability:</strong></td><td>${availability}</td></tr>
                        ${message ? `<tr><td style=\"padding: 6px 0; vertical-align:top;\"><strong>Message:</strong></td><td>${message}</td></tr>` : ''}
                      </table>
                    </div>
                    <p style="font-size: 1.05rem; color: #333; margin-bottom: 18px;">
                      <strong>What happens next?</strong><br/>
                      Our team will review your submission and match your skills and interests with our current needs. You will receive a follow-up email or phone call from our volunteer coordinator within a few days.
                    </p>
                    <p style="font-size: 1.05rem; color: #333; margin-bottom: 18px;">
                      <strong>Why volunteer with EDM?</strong><br/>
                      <ul style="margin: 8px 0 18px 24px; color: #444; font-size: 1rem;">
                        <li>Make a real impact in the lives of children, families, and communities in Sierra Leone and beyond.</li>
                        <li>Use your unique gifts and skills for a greater purpose.</li>
                        <li>Be part of a passionate, faith-driven team making a difference for Christ.</li>
                        <li>Opportunities for both local and remote involvement.</li>
                      </ul>
                    </p>
                    <p style="font-size: 1.05rem; color: #333; margin-bottom: 18px;">
                      If you have any questions, feel free to reply to this email or contact us at <a href="mailto:contact@edmmission.org" style="color: #2563eb; text-decoration: underline;">contact@edmmission.org</a>.
                    </p>
                    <p style="font-size: 1.05rem; color: #333; margin-bottom: 0;">
                      Thank you again for your heart to serve. We look forward to partnering with you!
                    </p>
                    <p style="font-size: 1.05rem; color: #333; margin-top: 32px;">
                      Blessings,<br/>
                      <strong>The EDM Volunteer Team</strong><br/>
                      Evangelism Discipleship Missions<br/>
                      <a href="https://edmmission.org" style="color: #2563eb; text-decoration: underline;">edmmission.org</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="background: #f0f4f8; text-align: center; padding: 18px 0; color: #888; font-size: 0.95rem; border-top: 1px solid #e0e6ed;">
                    &copy; ${new Date().getFullYear()} Evangelism Discipleship Missions. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `,
    text: `Hi ${name},\n\nThank you for your interest in volunteering with Evangelism Discipleship Missions (EDM)!\n\nHere is a summary of your submission:\n\nName: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ''}\nAreas of Interest: ${areasOfInterest && areasOfInterest.length > 0 ? areasOfInterest.join(', ') : 'N/A'}\nAvailability: ${availability}${message ? `\nMessage: ${message}` : ''}\n\nOur team will review your submission and reach out to you soon. If you have any questions, reply to this email or contact us at contact@edmmission.org.\n\nBlessings,\nThe EDM Volunteer Team\nedmmission.org`,
  };
}
