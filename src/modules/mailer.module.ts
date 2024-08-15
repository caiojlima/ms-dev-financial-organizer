import { Module } from "@nestjs/common";
import { MailerService } from "src/services";

@Module({
    providers: [MailerService],
    exports: [MailerService],
  })
  export class MailerModule {}