import { emailService } from './emailService';

export async function sendEventReminderEmail({ 
  name, 
  email, 
  event, 
  reminderType = '1hour' 
}: { 
  name: string; 
  email: string; 
  event: any; 
  reminderType?: '1week' | '1day' | '1hour';
}) {
  console.log('Attempting to send event reminder email:', {
    recipient: email,
    eventTitle: event.title,
    reminderType,
    isVirtual: event.isVirtual,
    eventDate: event.date,
    eventTime: event.time
  });
  // Format the date nicely
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Different subject lines based on reminder type
  const subjectLines = {
    '1week': `Upcoming Event in 1 Week: ${event.title}`,
    '1day': `Your Event is Tomorrow: ${event.title}`,
    '1hour': `Starting in 1 Hour: ${event.title}`,
  };

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.ADMIN_EMAIL}>`,
    to: email,
    subject: subjectLines[reminderType],
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f6f8fa; padding: 0; margin: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #f6f8fa; padding: 40px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); overflow: hidden;">
                <tr>
                  <td style="background: #003366; padding: 32px 0; text-align: center;">
                    <img src="https://code-alpha-image-gallary.vercel.app/edm-logo.png" alt="EDM Logo" width="120" style="display: block; margin: 0 auto 12px; border-radius: 8px;" />
                    <h1 style="color: #fff; font-size: 2rem; margin: 0; font-weight: 700; letter-spacing: 1px;">
                      ${reminderType === '1hour' ? 'Your Event Starts Soon!' : 'Event Reminder'}
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 32px 40px 24px 40px;">
                    <p style="font-size: 1.1rem; color: #222; margin-bottom: 18px;">Hi <strong>${name}</strong>,</p>
                    <p style="font-size: 1.05rem; color: #333; margin-bottom: 18px;">
                      ${reminderType === '1week' 
                        ? `This is a friendly reminder that you're registered for <strong>${event.title}</strong>, happening in one week!` 
                        : reminderType === '1day'
                        ? `Your registered event <strong>${event.title}</strong> is happening tomorrow!`
                        : `<strong>${event.title}</strong> is starting in one hour!`}
                    </p>
                    <table style="margin: 24px 0 32px 0; width: 100%; background: #f0f4f8; border-radius: 8px;">
                      <tr>
                        <td style="padding: 12px 18px; font-size: 1rem; color: #003366;">
                          <strong>Date:</strong> ${formattedDate}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 18px; font-size: 1rem; color: #003366;">
                          <strong>Time:</strong> ${event.time}
                        </td>
                      </tr>
                      ${event.isVirtual === 'true' || event.isVirtual === true 
                        ? reminderType === '1hour'
                          ? `<tr>
                              <td style="padding: 12px 18px; font-size: 1rem; background-color: #e6f3ff; color: #0077cc; border-radius: 6px;">
                                <strong>🔗 Join Event Link:</strong> 
                                <a href="${event.onlineLink}" style="color:#0077cc; text-decoration:underline; font-weight: 500;">${event.onlineLink}</a>
                              </td>
                            </tr>`
                          : `<tr>
                              <td style="padding: 12px 18px; font-size: 1rem; color: #0077cc;">
                                <strong>Event Type:</strong> Virtual Event (join link will be provided in the 1-hour reminder)
                              </td>
                            </tr>`
                        : `<tr>
                            <td style="padding: 12px 18px; font-size: 1rem; color: #003366;">
                              <strong>Location:</strong> ${event.location}
                            </td>
                          </tr>`
                      }
                    </table>
                    ${event.description ? `
                    <div style="font-size: 1rem; color: #444; margin-bottom: 24px; background: #f8f9fa; padding: 16px; border-radius: 6px;">
                      ${event.description}
                    </div>
                    ` : ''}
                    <p style="font-size: 1rem; color: #222;">
                      ${reminderType === '1hour' 
                        ? 'See you very soon!' 
                        : 'We look forward to seeing you at the event!'}<br/>
                      Blessings,<br/>
                      <strong>EDM Team</strong>
                    </p>
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
    text: `${subjectLines[reminderType]}\n\nHi ${name},\n${
      reminderType === '1week'
        ? `This is a friendly reminder that you're registered for ${event.title}, happening in one week!`
        : reminderType === '1day'
        ? `Your registered event ${event.title} is happening tomorrow!`
        : `${event.title} is starting in one hour!`
    }\n\nDate: ${formattedDate}\nTime: ${event.time}\n${
      event.isVirtual === 'true' || event.isVirtual === true
        ? reminderType === '1hour'
          ? `Join Event: ${event.onlineLink}`
          : 'Event Type: Virtual Event (join link will be provided in the final reminder)'
        : `Location: ${event.location}`
    }\n\n${event.description || ''}\n\n${
      reminderType === '1hour' ? 'See you very soon!' : 'We look forward to seeing you at the event!'
    }\n\nBlessings,\nEDM Team\nEvangelism Discipleship Mission`,
  };
  await emailService.sendMail(mailOptions);
}
