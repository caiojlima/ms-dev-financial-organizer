import { CreateWalletResponse } from 'src/controllers/dtos/create-wallet-response.dto';
import { Wallet } from 'src/models/wallet.entity';
import { IMapper } from './mapper.interface';
import { AllWallet } from 'src/controllers/dtos/all-wallet.dto';

export abstract class IWalletMapper
  implements IMapper<Wallet, CreateWalletResponse>
{
  abstract fromEntity(entity: Wallet): CreateWalletResponse;

  abstract fromEntities(entities: Wallet[]): AllWallet;
}
