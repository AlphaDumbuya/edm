const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: 'contact@edmmission.org', // your validated sender
    pass: 'xsmtpsib-5cdf22fac25bb61334fe6b569944e97cc606d26ae607976ed20336f47219d223-jELWUF8M45ztpKcy', // your SMTP key
  },
});

transporter.sendMail({
  from: '"EDM Test" <contact@edmmission.org>',
  to: 'alphadumbuya7@gmail.com', // your real email
  subject: 'Test Email from Brevo SMTP',
  text: 'This is a test email sent directly via Brevo SMTP.',
}, (err, info) => {
  if (err) {
    console.error('SMTP error:', err);
  } else {
    console.log('Email sent:', info);
  }
});