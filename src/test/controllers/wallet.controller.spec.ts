import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from '../../controllers/wallet.controller';
import { IWalletService } from '../../services/interfaces/wallet-service.interface';
import {
  CreateWalletRequest,
  CreateWalletResponse,
} from '../../controllers/dtos';
import { WalletQuery } from '../../controllers/dtos/wallet-query.dto';
import { AllWallet } from '../../controllers/dtos/all-wallet.dto';

describe('WalletController', () => {
  let walletController: WalletController;
  let walletService: IWalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        {
          provide: IWalletService,
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue({
                id: 1,
                description: 'Entrada',
                value: -100,
                paymentMethod: 'PIX',
              } as unknown as CreateWalletResponse),
            findAll: jest
              .fn()
              .mockResolvedValue({
                wallets: [
                  {
                    id: 1,
                    description: 'Entrada',
                    value: -100,
                    paymentMethod: 'PIX',
                  },
                ],
              } as unknown as AllWallet),
            findOne: jest
              .fn()
              .mockResolvedValue({
                id: 1,
                description: 'Entrada',
                value: -100,
                paymentMethod: 'PIX',
              } as unknown as CreateWalletResponse),
            update: jest
              .fn()
              .mockResolvedValue({
                id: 1,
                description: 'Entrada',
                value: -100,
                paymentMethod: 'PIX',
              } as unknown as CreateWalletResponse),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    walletController = module.get<WalletController>(WalletController);
    walletService = module.get<IWalletService>(IWalletService);
  });

  it('should be defined', () => {
    expect(walletController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new wallet', async () => {
      const walletDto: CreateWalletRequest = {
        description: 'Entrada',
        value: -100,
        paymentMethod: 'PIX',
      };
      const req = { user: { sub: 1 } };
      const result = await walletController.create(walletDto, req);
      expect(result).toEqual({
        id: 1,
        description: 'Entrada',
        value: -100,
        paymentMethod: 'PIX',
      });
      expect(walletService.create).toHaveBeenCalledWith(walletDto, 1);
    });
  });

  describe('findAll', () => {
    it('should return all wallets', async () => {
      const req = { user: { sub: 1 } };
      const query: WalletQuery = { start: '2024-01-01', end: '2024-12-31' };
      const result = await walletController.findAll(req, query);
      expect(result).toEqual({
        wallets: [
          { id: 1, description: 'Entrada', value: -100, paymentMethod: 'PIX' },
        ],
      });
      expect(walletService.findAll).toHaveBeenCalledWith(1, query);
    });
  });

  describe('findOne', () => {
    it('should return a wallet by id', async () => {
      const result = await walletController.findOne(1);
      expect(result).toEqual({
        id: 1,
        description: 'Entrada',
        value: -100,
        paymentMethod: 'PIX',
      });
      expect(walletService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a wallet by id', async () => {
      const walletDto: CreateWalletRequest = {
        description: 'Entrada',
        value: -100,
        paymentMethod: 'PIX',
      };
      const req = { user: { sub: 1 } };
      const result = await walletController.update(1, walletDto, req);
      expect(result).toEqual({
        id: 1,
        description: 'Entrada',
        value: -100,
        paymentMethod: 'PIX',
      });
      expect(walletService.update).toHaveBeenCalledWith(1, 1, walletDto);
    });
  });

  describe('remove', () => {
    it('should remove a wallet by id', async () => {
      const req = { user: { sub: 1 } };
      await walletController.remove(1, req);
      expect(walletService.remove).toHaveBeenCalledWith(1, 1);
    });
  });
});
