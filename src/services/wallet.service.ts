import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateWalletRequest,
  CreateWalletResponse,
} from 'src/controllers/dtos';
import { Wallet, User } from '../models';
import { IWalletService } from './interfaces/wallet-service.interface';
import { IWalletMapper } from '../mappers/interfaces/wallet-mapper.interface';
import { WalletQuery } from '../controllers/dtos/wallet-query.dto';
import { WalletCriteriaBuilder } from '../builders/wallet-criteria.builder';
import { AllWallet } from '../controllers/dtos/all-wallet.dto';

@Injectable()
export class WalletService implements IWalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mapper: IWalletMapper,
  ) {}

  async create(
    walletDto: CreateWalletRequest,
    id: number,
  ): Promise<CreateWalletResponse> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }

    const wallet = this.walletRepository.create(walletDto);
    const newWallet = await this.walletRepository.save({ ...wallet, user });
    return this.mapper.fromEntity(newWallet);
  }

  async findAll(userId: number, query?: WalletQuery): Promise<AllWallet> {
    const walletCriteriaBuilder = new WalletCriteriaBuilder({
      userId,
      ...query,
    });
    const where = walletCriteriaBuilder.build();
    const wallets = await this.walletRepository.find({
      where,
      order: {
        createdAt: 'DESC',
      },
      relations: ['user'],
    });

    return this.mapper.fromEntities(wallets);
  }

  async findOne(id: number): Promise<CreateWalletResponse> {
    const wallet = await this.walletRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    return this.mapper.fromEntity(wallet);
  }

  async update(
    id: number,
    userId: number,
    walletDto: CreateWalletRequest,
  ): Promise<CreateWalletResponse> {
    const wallet = await this.walletRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!wallet) throw new Error('Entrada não encontrada');

    if (userId !== wallet.user.id)
      throw new UnauthorizedException(
        'Id da entrada e do usuário não coincidem',
      );

    const newWallet = await this.walletRepository.save({
      ...wallet,
      ...walletDto,
    });
    return this.mapper.fromEntity(newWallet);
  }

  async remove(id: number, userId: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const wallet = await this.walletRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!wallet) throw new NotFoundException('Entrada não encontrada');

    if (userId !== wallet.user.id)
      throw new UnauthorizedException(
        'Id da entrada e do usuário não coincidem',
      );

    await this.walletRepository.delete(id);
  }
}
