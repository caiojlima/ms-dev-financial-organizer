import { CreateWalletRequest, CreateWalletResponse } from "src/controllers/dtos";
import { IBaseService } from "./services.interface";

export abstract class IWalletService implements IBaseService<CreateWalletRequest, CreateWalletResponse> {
    create(dto: CreateWalletRequest): Promise<CreateWalletResponse> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<CreateWalletResponse[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: number): Promise<CreateWalletResponse> {
        throw new Error("Method not implemented.");
    }
    update(id: number, userDto: CreateWalletRequest): Promise<CreateWalletResponse> {
        throw new Error("Method not implemented.");
    }
    remove(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
