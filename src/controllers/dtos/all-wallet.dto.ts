import { CreateWalletResponse } from './create-wallet-response.dto';

export class AllWallet {
  entries: CreateWalletResponse[];
  total: number;
}
