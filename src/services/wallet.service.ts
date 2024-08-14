import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateWalletRequest, CreateWalletResponse } from "src/controllers/dtos";
import { Wallet, User } from "src/models";
import { IWalletService } from "./interfaces/wallet-service.interface";
import { IWalletMapper } from "src/mappers/interfaces/wallet-mapper.interface";
import { WalletQuery } from "src/controllers/dtos/wallet-query.dto";
import { WalletCriteriaBuilder } from "src/builders/wallet-criteria.builder";

@Injectable()
export class WalletService implements IWalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mapper: IWalletMapper
  ) {}

  async create(walletDto: CreateWalletRequest, id: number): Promise<CreateWalletResponse> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }
    
    const wallet = this.walletRepository.create(walletDto);
    const newWallet = await this.walletRepository.save({ ...wallet, user });
    return this.mapper.fromEntity(newWallet)
  }

  async findAll(userId: number, query?: WalletQuery): Promise<CreateWalletResponse[]> {
    const walletCriteriaBuilder = new WalletCriteriaBuilder({userId, ...query})
    const where = walletCriteriaBuilder.build();
    const wallets = await this.walletRepository.find({ where, relations: ['user'] });
    return wallets.map((wallet) => this.mapper.fromEntity(wallet))
  }

  async findOne(id: number): Promise<CreateWalletResponse> {
    const wallet = await this.walletRepository.findOne({ where: { id }, relations: ['user'] });
    return this.mapper.fromEntity(wallet)
  }

  async update(id: number, userId: number, walletDto: CreateWalletRequest): Promise<CreateWalletResponse> {
    const wallet = await this.walletRepository.findOne({ where: { id }, relations: ['user'] })

    if (!wallet) throw new Error('Entrada não encontrada');

    if (userId !== wallet.user.id) throw new UnauthorizedException('Id da entrada e do usuário não coincidem')

    const newWallet = await this.walletRepository.save({ ...wallet, ...walletDto });
    return this.mapper.fromEntity(newWallet)
  }

  async remove(id: number, userId: number): Promise<void> {
    const wallet = await this.walletRepository.findOne({ where: { id }, relations: ['user'] })
    
    if (userId !== wallet.user.id) throw new UnauthorizedException('Id da entrada e do usuário não coincidem')

    await this.walletRepository.delete(id);
  }
}