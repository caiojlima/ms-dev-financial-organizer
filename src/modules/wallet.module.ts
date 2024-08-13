import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wallet } from "src/models/wallet.entity";
import { UserModule } from "./user.module";
import { WalletController } from "src/controllers/wallet.controller";
import { WalletService } from "src/services/wallet.service";

@Module({
    imports: [TypeOrmModule.forFeature([Wallet]), UserModule],
    providers: [WalletService],
    controllers: [WalletController],
  })
  export class WalletModule {}