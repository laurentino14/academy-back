import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class ResendProvider {
  private resend: Resend;
  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendEmail(
    email: string,
    subject: string,
    message: string,
  ): Promise<string> {
    try {
      const sent = await this.resend.emails.send({
        from: process.env.RESEND_EMAIL_FROM,
        to: email,
        subject,
        html: message,
      });
      return sent.data.id;
    } catch (err) {
      throw new Error('Error on sent email');
    }
  }
}
