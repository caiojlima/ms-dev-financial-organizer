import { CreateWalletRequest, CreateWalletResponse } from "../dtos";
import { IBaseController } from "./controller.interface";

export interface IWalletController extends IBaseController<CreateWalletRequest, CreateWalletResponse> {}