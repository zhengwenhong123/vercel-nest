import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

interface MailInfo {
  to: string; // 接受邮箱
  subject: string;  //标题
  text?: string;  //文本
  html?: string; //富文本
}

@Injectable()
export class AppService {
  private transporter: nodemailer.Transporter; //
  private mailConfig = {
    host: "smtp.qq.com",
    port: 465,
    secure: true,
    auth: {
      user: "1716142352@qq.com",
      pass: "wjngbvourrdyccbb"
    }
  };
  constructor() {
    this.transporter = nodemailer.createTransport(this.mailConfig);
  }
  async sendEmail(mailInfo: MailInfo): Promise<void> {
      const info = await this.transporter.sendMail({
        from: this.mailConfig.auth.user,
        ...mailInfo,
      })
  }
}
