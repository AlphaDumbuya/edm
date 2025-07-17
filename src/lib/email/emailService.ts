import nodemailer from 'nodemailer';

// Create a singleton email service
class EmailService {
  private static instance: EmailService;
  private transporter: nodemailer.Transporter | null = null;

  private constructor() {
    // Only create the transporter if emails are enabled
    if (process.env.DISABLE_EMAILS !== 'true') {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    }
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  async sendMail(options: nodemailer.SendMailOptions) {
    if (process.env.DISABLE_EMAILS === 'true') {
      console.log('Emails disabled. Would have sent:', options);
      return;
    }

    if (!this.transporter) {
      throw new Error('Email transporter not initialized');
    }

    try {
      return await this.transporter.sendMail(options);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }
}

export const emailService = EmailService.getInstance();
