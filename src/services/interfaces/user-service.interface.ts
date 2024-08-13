import { CreateUserRequest, CreateUserResponse } from "src/controllers/dtos";
import { IBaseService } from "./services.interface";

export abstract class IUserService implements IBaseService<CreateUserRequest, CreateUserResponse> {
    create(dto: CreateUserRequest): Promise<CreateUserResponse> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<CreateUserResponse[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: number): Promise<CreateUserResponse> {
        throw new Error("Method not implemented.");
    }
    update(id: number, userDto: CreateUserRequest): Promise<CreateUserResponse> {
        throw new Error("Method not implemented.");
    }
    remove(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}