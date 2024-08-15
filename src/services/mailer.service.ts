import { Injectable } from "@nestjs/common";
import * as mailgun from 'mailgun-js';

@Injectable()
export class MailerService {
  private mg: { messages: () => { (): any; new(): any; send: { (arg0: { from: string; to: string; subject: string; text: string; }): any; new(): any; }; }; };

  constructor() {
    this.mg = mailgun({
      apiKey: process.env.MAILER_API_KEY,
      domain: process.env.MAILER_DOMAIN,
    });
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    const data = {
      from: process.env.MAILER_EMAIL,
      to,
      subject,
      text,
    };

    await this.mg.messages().send(data);
  }
}