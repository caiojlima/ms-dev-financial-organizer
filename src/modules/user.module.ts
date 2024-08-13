import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "src/controllers/user.controller";
import { IUserMapper } from "src/mappers/interfaces/user-mapper.interface";
import { IWalletMapper } from "src/mappers/interfaces/wallet-mapper.interface";
import { UserMapper } from "src/mappers/user.mapper";
import { WalletMapper } from "src/mappers/wallet.mapper";
import { User } from "src/models/user.entity";
import { IUserService } from "src/services/interfaces/user-service.interface";
import { UserService } from "src/services/user.service";
import { WalletModule } from "./wallet.module";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
      { provide: IUserService, useClass: UserService },
      { provide: IUserMapper, useClass: UserMapper },
      { provide: IWalletMapper, useClass: WalletMapper },
    ],
    controllers: [UserController],
    exports: [TypeOrmModule],
  })
  export class UserModule {}