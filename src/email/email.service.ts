import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { envs } from '../config/envs';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_USER,
      pass: envs.MAILER_TOKEN,
    },
  });

  async sendEmail(to: string, subject: string, html: string): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: `"AguaFix API" <${envs.MAILER_USER}>`,
        to,
        subject,
        html,
      });
      return true;
    } catch (error) {
      console.error('Error enviando correo:', error);
      return false;
    }
  }
}