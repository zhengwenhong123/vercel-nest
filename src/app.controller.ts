import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  private redisClient: any;

  constructor(private readonly appService: AppService) {
  }

  @Post("/send/emailCaptcha")
  async sendEmailCaptcha(@Body() emailInfo: { email: string }) {
    console.log(emailInfo)
    // 验证邮箱信息是否存在
    if (!emailInfo || !emailInfo.email) {
      throw new HttpException("邮箱信息不能为空", HttpStatus.BAD_REQUEST);
    }

    // 生成随机四位数作为验证码
    const emailCaptcha = Math.floor(Math.random() * 9000) + 1000;

    // 假设redisClient和emailService是已经定义好的服务
    // 将验证码存储到Redis中，并设置过期时间为30分钟
    // await this.redisClient.set(`emailCaptcha:${emailInfo.email}`, emailCaptcha);
    // await this.redisClient.expire(`emailCaptcha:${emailInfo.email}`, 60 * 30); // 30分钟

    // 发送邮件验证码

    const emailResponse = await this.appService.sendEmail({
      to: emailInfo.email,
      html: `<div class="macbook" style="width: 150px; height: 96px; position: absolute; left: 50%; top: 50%; margin: -85px 0 0 -78px; perspective: 500px;">
  <div class="inner" style="z-index: 20; position: absolute; width: 150px; height: 96px; left: 0; top: 0; transform-style: preserve-3d; transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg); animation: rotate infinite 7s ease;">
    <div class="screen" style="width: 150px; height: 96px; position: absolute; left: 0; bottom: 0; border-radius: 7px; background: #ddd; transform-style: preserve-3d; transform-origin: 50% 93px; transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); animation: lid-screen infinite 7s ease; background-image: linear-gradient(45deg, rgba(0,0,0,0.34) 0%,rgba(0,0,0,0) 100%); background-position: left bottom; background-size: 300px 300px; box-shadow: inset 0 3px 7px rgba(255,255,255,0.5);">
      <div class="face-one" style="width: 150px; height: 96px; position: absolute; left: 0; bottom: 0; border-radius: 7px; background: #d3d3d3; transform: translateZ(2px); background-image: linear-gradient(45deg,rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);">
        <div class="camera" style="width: 3px; height: 3px; border-radius: 100%; background: #000; position: absolute; left: 50%; top: 4px; margin-left: -1.5px;"></div>
        <div class="display" style="width: 130px; height: 74px; margin: 10px; background-color: #000; background-size: 100% 100%; border-radius: 1px; position: relative; box-shadow: inset 0 0 2px rgba(0,0,0,1);">
          <div class="shade" style="position: absolute; left: 0; top: 0; width: 130px; height: 74px; background: linear-gradient(-135deg, rgba(255,255,255,0) 0%,rgba(255,255,255,0.1) 47%,rgba(255,255,255,0) 48%); animation: screen-shade infinite 7s ease; background-size: 300px 200px; background-position: 0px 0px;">
         
</div>
        </div>
        <span style="position: absolute; top: 55px; left: 57px; font-size: 12px; color: white;">${emailCaptcha}</span> 
      </div>
    </div>
    <div class="macbody" style="width: 150px; height: 96px; position: absolute; left: 0; bottom: 0; border-radius: 7px; background: #cbcbcb; transform-style: preserve-3d; transform-origin: 50% bottom; transform: rotateX(-90deg); animation: lid-macbody infinite 7s ease; background-image: linear-gradient(45deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);">
      <div class="face-one" style="width: 150px; height: 96px; position: absolute; left: 0; bottom: 0; border-radius: 7px; transform-style: preserve-3d; background: #dfdfdf; animation: lid-keyboard-area infinite 7s ease; transform: translateZ(-2px); background-image: linear-gradient(30deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%);">
        <div class="touchpad" style="width: 40px; height: 31px; position: absolute; left: 50%; top: 50%; border-radius: 4px; margin: -44px 0 0 -18px; background: #cdcdcd; background-image: linear-gradient(30deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%); box-shadow: inset 0 0 3px #888;"></div>
        <div class="keyboard" style="width: 130px; height: 45px; position: absolute; left: 7px; top: 41px; border-radius: 4px; transform-style: preserve-3d; background: #cdcdcd; background-image: linear-gradient(30deg, rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%); box-shadow: inset 0 0 3px #777; padding: 0 0 0 2px;">
          <div class="key" style="width: 6px; height: 6px; background: #444; float: left; margin: 1px; transform: translateZ(-2px); border-radius: 2px; box-shadow: 0 -2px 0 #222; animation: keys infinite 7s ease;"></div>
          <!-- Add more key elements here as needed -->
        </div>
      </div>
      <div class="pad one" style="width: 5px; height: 5px; background: #333; border-radius: 100%; position: absolute; left: 20px; top: 20px;"></div>
      <div class="pad two" style="width: 5px; height: 5px; background: #333; border-radius: 100%; position: absolute; right: 20px; top: 20px;"></div>
      <div class="pad three" style="width: 5px; height: 5px; background: #333; border-radius: 100%; position: absolute; right: 20px; bottom: 20px;"></div>
      <div class="pad four" style="width: 5px; height: 5px; background: #333; border-radius: 100%; position: absolute; left: 20px; bottom: 20px;"></div>
    </div>
  </div>
  <div class="shadow" style="position: absolute; width: 60px; height: 0px; left: 40px; top: 160px; transform: rotateX(80deg) rotateY(0deg) rotateZ(0deg); box-shadow: 0 0 60px 40px rgba(0,0,0,0.3); animation: shadow infinite 7s ease;"></div>
</div>
`,
      subject: "xxx平台邮箱检验提醒"
    });

    // 可以根据邮件发送结果进行相应的处理


  }
  @Get()
  getHello(){
    return '123'
  }
}