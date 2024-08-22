import { CreateUserResponse } from 'src/controllers/dtos/create-user-response.dto';
import { User } from 'src/models/user.entity';
import { IUserMapper } from './interfaces/user-mapper.interface';
import { IWalletMapper } from './interfaces/wallet-mapper.interface';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserMapper implements IUserMapper {
  constructor(
    @Inject(forwardRef(() => IWalletMapper))
    private walletMapper: IWalletMapper,
  ) {}

  fromEntity(user: User): CreateUserResponse {
    if (!user) return undefined;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      wallet: user.wallets?.map((wallet) =>
        this.walletMapper.fromEntity(wallet),
      ),
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    };
  }
}
