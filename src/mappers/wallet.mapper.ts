import { Wallet } from "src/models/wallet.entity";
import { IWalletMapper } from "./interfaces/wallet-mapper.interface";
import { CreateWalletResponse } from "src/controllers/dtos/create-wallet-response.dto";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { IUserMapper } from "./interfaces/user-mapper.interface";

@Injectable()
export class WalletMapper implements IWalletMapper {
    constructor(
        @Inject(forwardRef(() => IUserMapper))
        private userMapper: IUserMapper
    ) { }

    fromEntity(wallet: Wallet): CreateWalletResponse {
        return {
        id: wallet?.id,
        description: wallet.description,
        value: wallet.value,
        paymentMethod: wallet.paymentMethod,
        user: this.userMapper?.fromEntity(wallet.user),
        createdAt: wallet.createdAt?.toISOString(),
        updatedAt: wallet.updatedAt.toISOString(),
        };
    }
}