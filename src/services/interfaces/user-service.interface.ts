import { CreateUserRequest, CreateUserResponse } from "src/controllers/dtos";

export abstract class IUserService {
    create(dto: CreateUserRequest): Promise<CreateUserResponse> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<CreateUserResponse[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: number, userId: number): Promise<CreateUserResponse> {
        throw new Error("Method not implemented.");
    }
    update(id: number, userDto: CreateUserRequest): Promise<CreateUserResponse> {
        throw new Error("Method not implemented.");
    }
    remove(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    checkEmail(email: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}