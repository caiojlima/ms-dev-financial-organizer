import { CreateUserRequest, CreateUserResponse } from "../dtos";
import { IBaseController } from "./controller.interface";

export interface IUserController extends IBaseController<CreateUserRequest, CreateUserResponse> {}