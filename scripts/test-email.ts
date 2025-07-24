import nodemailer from 'nodemailer';

async function testEmail() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    console.log('Testing email configuration...');
    console.log('SMTP Settings:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      user: process.env.SMTP_USER,
    });

    // Test the connection
    await transporter.verify();
    console.log('SMTP connection successful!');

    // Try sending a test email
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // sending to yourself for testing
      subject: 'EDM Event System - Email Test',
      text: 'If you receive this email, the email system is working correctly!',
      html: '<p>If you receive this email, the email system is working correctly!</p>',
    });

    console.log('Test email sent successfully!', info.messageId);
  } catch (error) {
    console.error('Error testing email:', error);
  }
}

testEmail().catch(console.error);
