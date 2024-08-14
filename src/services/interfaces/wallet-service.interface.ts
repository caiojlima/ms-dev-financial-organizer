import { CreateWalletRequest, CreateWalletResponse } from "src/controllers/dtos";
import { WalletQuery } from "src/controllers/dtos/wallet-query.dto";

export abstract class IWalletService {
    create(dto: CreateWalletRequest, userId: number): Promise<CreateWalletResponse> {
        throw new Error("Method not implemented.");
    }
    findAll(userId: number, query?: WalletQuery): Promise<CreateWalletResponse[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: number): Promise<CreateWalletResponse> {
        throw new Error("Method not implemented.");
    }
    update(id: number, userId: number,  dto: CreateWalletRequest): Promise<CreateWalletResponse> {
        throw new Error("Method not implemented.");
    }
    remove(id: number, userId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
