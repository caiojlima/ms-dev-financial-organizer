import { CreateWalletResponse } from "src/controllers/dtos/create-wallet-response.dto";
import { Wallet } from "src/models/wallet.entity";
import { IMapper } from "./mapper.interface";

export abstract class IWalletMapper implements IMapper<Wallet, CreateWalletResponse> {
  fromEntity(entity: Wallet): CreateWalletResponse {
    throw new Error("Method not implemented.");
  }
}