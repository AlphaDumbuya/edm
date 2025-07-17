import { emailService } from './emailService';

export async function sendEventRegistrationEmail({ name, email, event }: { name: string; email: string; event: any }) {
  // Check if event is starting in less than an hour
  const eventDateTime = new Date(event.date);
  const [hours, minutes] = event.time.split(':').map(Number);
  eventDateTime.setHours(hours, minutes);
  const isStartingSoon = eventDateTime.getTime() - new Date().getTime() < 60 * 60 * 1000; // Less than 1 hour

  // Format the date with weekday
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Format time to 12-hour format with AM/PM
  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    });
  };
  
  const formattedTime = formatTime(event.time);

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.ADMIN_EMAIL}>`,
    to: email,
    subject: `🎉 Registration Confirmed: ${event.title}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f6f8fa; padding: 0; margin: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #f6f8fa; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); overflow: hidden;">
                <tr>
                  <td style="background: #003366; padding: 32px 0; text-align: center;">
                    <img src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width="120" style="display: block; margin: 0 auto 12px; border-radius: 8px;" />
                    <h1 style="color: #fff; font-size: 2rem; margin: 0; font-weight: 700; letter-spacing: 1px;">You're All Set! 🎉</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 32px 40px 24px 40px;">
                    <p style="font-size: 1.1rem; color: #222; margin-bottom: 18px;">Dear <strong>${name}</strong>,</p>
                    <p style="font-size: 1.05rem; color: #333; margin-bottom: 18px;">Thank you for registering for <strong>${event.title}</strong>! We're excited to have you join us.</p>
                    <div style="background: #f8f9fa; border-radius: 8px; padding: 24px; margin: 24px 0;">
                      <h2 style="margin: 0 0 16px 0; color: #2563eb; font-size: 1.25rem;">Event Details</h2>
                      <table style="width: 100%; border-collapse: separate; border-spacing: 0 8px;">
                        <tr>
                          <td style="padding: 8px 16px; background: #fff; border-radius: 6px;">
                            <strong style="color: #374151;">📅 Date:</strong>
                            <span style="margin-left: 8px; color: #4b5563;">${formattedDate}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 16px; background: #fff; border-radius: 6px;">
                            <strong style="color: #374151;">⏰ Time:</strong>
                            <span style="margin-left: 8px; color: #4b5563;">${formattedTime}</span>
                          </td>
                        </tr>
                        ${event.isVirtual === 'true' || event.isVirtual === true 
                          ? isStartingSoon 
                            ? `<tr>
                                <td style="padding: 8px 16px; background: #fff; border-radius: 6px;">
                                  <strong style="color: #374151;">📍 Location:</strong>
                                  <span style="margin-left: 8px; color: #4b5563;">Virtual Event</span>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 16px; background: #e6f3ff; border-radius: 6px;">
                                  <strong style="color: #0077cc;">💻 Virtual Event Link:</strong>
                                  <span style="margin-left: 8px;">
                                    <a href="${event.onlineLink}" style="color: #2563eb; text-decoration: none;">${event.onlineLink}</a>
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 16px; background: #fff; border-radius: 6px;">
                                  <strong style="color: #0077cc;">⚠️ Important:</strong>
                                  <span style="margin-left: 8px; color: #4b5563;">This event starts in less than an hour. Please save this link to join the event.</span>
                                </td>
                              </tr>`
                            : `<tr>
                                <td style="padding: 8px 16px; background: #fff; border-radius: 6px;">
                                  <strong style="color: #374151;">📍 Location:</strong>
                                  <span style="margin-left: 8px; color: #4b5563;">Virtual Event</span>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 8px 16px; background: #fff; border-radius: 6px;">
                                  <strong style="color: #0077cc;">⚠️ Note:</strong>
                                  <span style="margin-left: 8px; color: #4b5563;">You will receive the event link in the reminder email one hour before the event.</span>
                                </td>
                              </tr>`
                          : `<tr>
                              <td style="padding: 8px 16px; background: #fff; border-radius: 6px;">
                                <strong style="color: #374151;">📍 Location:</strong>
                                <span style="margin-left: 8px; color: #4b5563;">${event.location}</span>
                              </td>
                            </tr>`}
                      </table>
                    </div>
                    ${event.description ? `
                    <div style="margin-top: 24px;">
                      <h3 style="color: #4b5563; margin: 0 0 12px 0; font-size: 1.1rem;">About the Event</h3>
                      <div style="font-size: 1rem; color: #4b5563; line-height: 1.6;">${event.description}</div>
                    </div>
                    ` : ''}
                    <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                      <p style="font-size: 1rem; color: #4b5563; margin-bottom: 16px;">
                        We look forward to having you with us! If you need to make any changes to your registration or have questions, please don't hesitate to contact us.
                      </p>
                      <p style="font-size: 1rem; color: #4b5563;">
                        Blessings,<br/>
                        <strong>EDM Team</strong>
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="background: #f8f9fa; text-align: center; padding: 24px; color: #6b7280; font-size: 0.9rem; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0 0 8px 0;">
                      Need assistance? Reply to this email or contact us at
                      <a href="mailto:contact@edmmission.org" style="color: #2563eb; text-decoration: none;">contact@edmmission.org</a>
                    </p>
                    <p style="margin: 0; color: #9ca3af;">
                      &copy; ${new Date().getFullYear()} Evangelism Discipleship Mission. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `,
    text: `Thank you for registering for ${event.title}!\n\nHi ${name},\nYour registration for ${event.title} is confirmed.\n\nEvent Details:\nDate: ${formattedDate}\nTime: ${formattedTime}\n${event.isVirtual === 'true' || event.isVirtual === true 
      ? isStartingSoon
        ? `Type: Virtual Event\nJoin Link: ${event.onlineLink}\n\nIMPORTANT: This event starts in less than an hour. Please save this link to join the event.`
        : `Type: Virtual Event\nNote: You will receive the event link in the reminder email one hour before the event.`
      : `Location: ${event.location}`}\n\nWe look forward to seeing you!\n\nBlessings,\nEDM Team\nEvangelism Discipleship Mission`,
  };
  try {
    console.log('Sending event registration confirmation email:', {
      recipient: email,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      isVirtual: event.isVirtual
    });
    await emailService.sendMail(mailOptions);
  } catch (error) {
    console.error('sendEventRegistrationEmail error:', error);
    console.error('Email input:', { name, email, event });
    throw error;
  }
}
