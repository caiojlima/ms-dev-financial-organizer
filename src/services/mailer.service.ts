import { Injectable } from "@nestjs/common";
import * as Brevo from '@getbrevo/brevo'
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailerService {
  constructor(private config: ConfigService) {
  }
  async sendMail(to: any, subject: string, text: string): Promise<void> {
    const apiKey = this.config.get('MAILER_API_KEY')

    const apiInstance = new Brevo.TransactionalEmailsApi()
    apiInstance.setApiKey(0, apiKey)

    await apiInstance.sendTransacEmail({
      sender: { email: process.env.MAILER_EMAIL },
      to: [to],
      subject,
      htmlContent: `<p> ${text} <p>`,
    });
    
  }
}