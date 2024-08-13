import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateWalletRequest, CreateWalletResponse } from "src/controllers/dtos";
import { Wallet, User } from "src/models";
import { IWalletService } from "./interfaces/wallet-service.interface";
import { IWalletMapper } from "src/mappers/interfaces/wallet-mapper.interface";

@Injectable()
export class WalletService implements IWalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mapper: IWalletMapper
  ) {}

  async create(walletDto: CreateWalletRequest): Promise<CreateWalletResponse> {
    const user = await this.userRepository.findOneBy({ id: walletDto.userId });
    if (!user) {
      throw new Error('User not found');
    }
    
    const wallet = this.walletRepository.create(walletDto);
    const newWallet = await this.walletRepository.save({ ...wallet, user });
    return this.mapper.fromEntity(newWallet)
  }

  async findAll(): Promise<CreateWalletResponse[]> {
    const wallets = await this.walletRepository.find({ relations: ['user'] });
    return wallets.map((wallet) => this.mapper.fromEntity(wallet))
  }

  async findOne(id: number): Promise<CreateWalletResponse> {
    const wallet = await this.walletRepository.findOne({ where: { id }, relations: ['user'] });
    return this.mapper.fromEntity(wallet)
  }

  async update(id: number, walletDto: CreateWalletRequest): Promise<CreateWalletResponse> {
    const wallet = await this.walletRepository.findOneBy({ id })

    if (!wallet) throw new Error('Entrada não encontrada');

    const newWallet = await this.walletRepository.save({ ...wallet, ...walletDto });
    return this.mapper.fromEntity(newWallet)
  }

  async remove(id: number): Promise<void> {
    await this.walletRepository.delete(id);
  }
}