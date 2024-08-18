import { Module } from "@nestjs/common";
import { PasswordResetController } from "../controllers/password-reset.controller";
import { PasswordResetService, MailerService } from "../services";
import { MailerModule, UserModule } from ".";
import { CacheModule } from "@nestjs/cache-manager";

@Module({
    imports: [UserModule, MailerModule, CacheModule.register()],
    providers: [PasswordResetService, MailerService],
    controllers: [PasswordResetController],
  })
  export class PasswordResetModule {}