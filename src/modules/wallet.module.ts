import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wallet } from "src/models/wallet.entity";
import { UserModule } from "./user.module";
import { WalletController } from "src/controllers/wallet.controller";
import { WalletService } from "src/services/wallet.service";
import { WalletMapper } from "src/mappers/wallet.mapper";
import { IWalletMapper } from "src/mappers/interfaces/wallet-mapper.interface";
import { IWalletService } from "src/services/interfaces/wallet-service.interface";
import { IUserMapper } from "src/mappers/interfaces/user-mapper.interface";
import { UserMapper } from "src/mappers/user.mapper";

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