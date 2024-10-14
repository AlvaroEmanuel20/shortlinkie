export interface TestMailData {
  to: string;
  subject: string;
  html: string;
  plainText: string;
}

export interface MailData extends TestMailData {
  templateId?: number;
  params?: MailParams;
}

export interface MailParams {
  FNAME?: string;
  LNAME?: string;
  confirmEmailLink?: string;
  newConfirmEmailLink?: string;
  recoverPassLink?: string;
  newRecoverPassEmailLink?: string;
}
