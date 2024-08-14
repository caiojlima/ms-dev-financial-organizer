import { CreateWalletRequest, CreateWalletResponse } from "src/controllers/dtos";

export abstract class IWalletService {
    create(dto: CreateWalletRequest, userId: number): Promise<CreateWalletResponse> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<CreateWalletResponse[]> {
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
