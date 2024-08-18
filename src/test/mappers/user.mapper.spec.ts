import { Test, TestingModule } from '@nestjs/testing';
import { UserMapper } from '../../mappers/user.mapper';
import { WalletMapper } from '../../mappers/wallet.mapper';
import { User } from '../../models';
import { CreateUserResponse } from '../../controllers/dtos/create-user-response.dto';
import { IWalletMapper } from '../../mappers/interfaces/wallet-mapper.interface';
import { IUserMapper } from '../../mappers/interfaces/user-mapper.interface';

describe('UserMapper', () => {
  let userMapper: UserMapper;
  let walletMapper: WalletMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: IUserMapper, useClass: UserMapper },
        { provide: IWalletMapper, useClass: WalletMapper },
      ],
    }).compile();

    userMapper = module.get<UserMapper>(IUserMapper);
    walletMapper = module.get<WalletMapper>(IWalletMapper);
  });

  describe('fromEntity', () => {
    it('should map a User entity to CreateUserResponse', () => {
      const user: User = {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          createdAt: new Date('2024-01-01T00:00:00Z'),
          updatedAt: new Date('2024-01-02T00:00:00Z'),
          wallets: [
              {
                  id: 1,
                  description: 'Personal Wallet',
                  value: 100,
                  paymentMethod: 'Credit Card',
                  createdAt: new Date('2024-01-01T00:00:00Z'),
                  updatedAt: new Date('2024-01-02T00:00:00Z'),
                  user: new User
              },
          ],
          password: ''
      };

      const expectedResponse: CreateUserResponse = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        wallet: [
          {
              id: 1,
              description: 'Personal Wallet',
              value: 100,
              paymentMethod: 'Credit Card',
              createdAt: '2024-01-01T00:00:00.000Z',
              updatedAt: '2024-01-02T00:00:00.000Z',
              user: new CreateUserResponse
          },
        ],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-02T00:00:00.000Z',
      };

      expect(userMapper.fromEntity(user)).toEqual(expectedResponse);
    });

    it('should handle missing user fields', () => {
      expect(userMapper.fromEntity(undefined)).toEqual(undefined);
    });
  });
});
