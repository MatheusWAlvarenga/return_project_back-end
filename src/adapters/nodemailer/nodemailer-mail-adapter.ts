import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a6d47491ea44d9",
    pass: "4cb0e5b8e3757f",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe MWBR-TECNOLOGIA <oi@feedget.com>",
      to: "Matheus Alvarenga <matheuswalvarenga@gmail.com>",
      subject,
      html: body,
    });
  }
}
