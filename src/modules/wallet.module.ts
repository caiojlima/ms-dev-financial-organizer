import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wallet } from "../models/wallet.entity";
import { UserModule } from "./user.module";
import { WalletController } from "../controllers/wallet.controller";
import { WalletService } from "../services/wallet.service";
import { WalletMapper } from "../mappers/wallet.mapper";
import { IWalletMapper } from "../mappers/interfaces/wallet-mapper.interface";
import { IWalletService } from "../services/interfaces/wallet-service.interface";
import { IUserMapper } from "../mappers/interfaces/user-mapper.interface";
import { UserMapper } from "../mappers/user.mapper";

@Module({
    imports: [TypeOrmModule.forFeature([Wallet]), UserModule],
    providers: [
      { provide: IWalletService, useClass: WalletService },
      { provide: IWalletMapper, useClass: WalletMapper },
      { provide: IUserMapper, useClass: UserMapper },
    ],
    controllers: [WalletController],
    exports: [TypeOrmModule],
  })
  export class WalletModule {}