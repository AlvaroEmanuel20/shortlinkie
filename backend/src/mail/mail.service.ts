import * as nodemailer from 'nodemailer';
import CustomBusinessError from '../utils/errors/CustomBusinessError';
import axios from 'axios';

interface TestMailData {
  to: string;
  subject: string;
  html: string;
  plainText: string;
}

interface MailData extends TestMailData {
  templateId?: number;
  params?: MailParams;
}

type MailParams = {
  FNAME?: string
  LNAME?: string
  confirmEmailLink?: string
  newConfirmEmailLink?: string
  recoverPassLink?: string
  newRecoverPassEmailLink?: string
}

export default class MailService {
  private config = {
    mailEnv: '',
    fromEmail: '',
    fromName: '',
  };

  constructor() {
    this.config = {
      mailEnv: process.env.MAIL_ENV as string,
      fromEmail: process.env.FROM_EMAIL as string,
      fromName: process.env.FROM_NAME as string,
    };
  }

  private async sendTestMail({ to, subject, html, plainText }: TestMailData) {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const result = await transporter.sendMail({
      from: `"${this.config.fromName}" <${this.config.fromEmail}>`,
      to,
      subject,
      text: plainText,
      html,
    });

    console.log('Message sent: %s', result.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(result));
  }

  public async sendMail(mailData: MailData) {
    if (this.config.mailEnv === 'dev') {
      await this.sendTestMail(mailData);
      return;
    }

    if (this.config.mailEnv === 'prod') {
      const brevoApiKey = process.env.BREVO_API_KEY;
      const replyEmail = process.env.REPLY_EMAIL;
      const emailTag = process.env.EMAIL_TAG;

      const emailConfig = {
        subject: mailData.subject,
        textContent: mailData.plainText,
        htmlContent: mailData.html,
        sender: { name: this.config.fromName, email: this.config.fromEmail },
        to: [{ email: mailData.to }],
        replyTo: { email: replyEmail },
        templateId: mailData.templateId,
        tags: [emailTag],
        params: mailData.params,
      };

      try {
        const url = 'https://api.brevo.com/v3/smtp/email';
        const res = await axios.post<{ messageId: string }>(url, emailConfig, {
          headers: { 'api-key': brevoApiKey },
        });

        return res.data.messageId;
      } catch (error) {
        
        throw new CustomBusinessError(
          'Error to send confirmation email',
          'send email'
        );
      }
    }
  }
}
