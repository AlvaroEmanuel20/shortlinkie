import * as nodemailer from 'nodemailer';

interface TestMailData {
  to: string;
  subject: string;
  html: string;
  plainText: string;
}

type MailData = TestMailData;

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
  }
}
