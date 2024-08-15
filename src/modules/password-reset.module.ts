import { Module } from "@nestjs/common";
import { PasswordResetController } from "src/controllers/password-reset.controller";
import { PasswordResetService, MailerService, RedisService } from "src/services";
import { MailerModule, RedisModule, UserModule } from ".";

@Module({
    imports: [
      UserModule,
      MailerModule,
      RedisModule,
    ],
    providers: [PasswordResetService, MailerService, RedisService],
    controllers: [PasswordResetController],
  })
  export class PasswordResetModule {}