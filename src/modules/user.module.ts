import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "../controllers/user.controller";
import { IUserMapper } from "../mappers/interfaces/user-mapper.interface";
import { IWalletMapper } from "../mappers/interfaces/wallet-mapper.interface";
import { UserMapper } from "../mappers/user.mapper";
import { WalletMapper } from "../mappers/wallet.mapper";
import { User } from "../models/user.entity";
import { IUserService } from "../services/interfaces/user-service.interface";
import { UserService } from "../services/user.service";

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