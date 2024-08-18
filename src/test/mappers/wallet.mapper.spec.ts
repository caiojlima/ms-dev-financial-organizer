import { Test, TestingModule } from '@nestjs/testing';
import { WalletMapper } from '../../mappers/wallet.mapper';
import { UserMapper } from '../../mappers/user.mapper';
import { Wallet } from '../../models/wallet.entity';
import { CreateWalletResponse } from '../../controllers/dtos/create-wallet-response.dto';
import { AllWallet } from '../../controllers/dtos/all-wallet.dto';
import { IUserMapper } from '../../mappers/interfaces/user-mapper.interface';
import { IWalletMapper } from '../../mappers/interfaces/wallet-mapper.interface';

describe('WalletMapper', () => {
  let walletMapper: WalletMapper;
  let userMapper: IUserMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: IUserMapper, useClass: UserMapper },
        { provide: IWalletMapper, useClass: WalletMapper },
      ],
    }).compile();

    walletMapper = module.get<WalletMapper>(IWalletMapper);
    userMapper = module.get<IUserMapper>(IUserMapper);
  });

  describe('fromEntity', () => {
    it('should map a Wallet entity to CreateWalletResponse', () => {
      const wallet: Wallet = {
        id: 1,
        description: 'Personal Wallet',
        value: 100,
        paymentMethod: 'Credit Card',
        createdAt: new Date('2024-01-01T00:00:00Z'),
        updatedAt: new Date('2024-01-02T00:00:00Z'),
        user: {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            createdAt: new Date('2024-01-01T00:00:00Z'),
            updatedAt: new Date('2024-01-02T00:00:00Z'),
            password: '',
            wallets: []
        },
      };

      const expectedResponse: CreateWalletResponse = {
        id: 1,
        description: 'Personal Wallet',
        value: 100,
        paymentMethod: 'Credit Card',
        user: {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-02T00:00:00.000Z',
            wallet: []
        },
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-02T00:00:00.000Z',
      };

      expect(walletMapper.fromEntity(wallet)).toEqual(expectedResponse);
    });
  });

  describe('fromEntities', () => {
    it('should map multiple Wallet entities to AllWallet', () => {
      const wallets: Wallet[] = [
        {
          id: 1,
          description: 'Personal Wallet',
          value: 100,
          paymentMethod: 'Credit Card',
          createdAt: new Date('2024-01-01T00:00:00Z'),
          updatedAt: new Date('2024-01-02T00:00:00Z'),
          user: {
              id: 1,
              name: 'John Doe',
              email: 'john.doe@example.com',
              createdAt: new Date('2024-01-01T00:00:00Z'),
              updatedAt: new Date('2024-01-02T00:00:00Z'),
              password: '',
              wallets: []
          },
        },
        {
          id: 2,
          description: 'Travel Wallet',
          value: 200,
          paymentMethod: 'Cash',
          createdAt: new Date('2024-01-03T00:00:00Z'),
          updatedAt: new Date('2024-01-04T00:00:00Z'),
          user: {
              id: 1,
              name: 'John Doe',
              email: 'john.doe@example.com',
              createdAt: new Date('2024-01-01T00:00:00Z'),
              updatedAt: new Date('2024-01-02T00:00:00Z'),
              password: '',
              wallets: []
          },
        },
      ];

      const expectedResponse: AllWallet = {
        entries: [
          {
            id: 1,
            description: 'Personal Wallet',
            value: 100,
            paymentMethod: 'Credit Card',
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-02T00:00:00.000Z',
            user: {
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-02T00:00:00.000Z',
                wallet: []
            },
          },
          {
            id: 2,
            description: 'Travel Wallet',
            value: 200,
            paymentMethod: 'Cash',
            createdAt: '2024-01-03T00:00:00.000Z',
            updatedAt: '2024-01-04T00:00:00.000Z',
            user: {
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-02T00:00:00.000Z',
                wallet: []
            },
          },
        ],
        total: 300,
      };

      expect(walletMapper.fromEntities(wallets)).toEqual(expectedResponse);
    });
  });
});
