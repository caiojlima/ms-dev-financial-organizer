import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/models/user.entity";
import { Wallet } from "src/models/wallet.entity";
import { Repository } from "typeorm";

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(walletDto: Partial<Wallet>, userId: number): Promise<Wallet> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const wallet = this.walletRepository.create({ ...walletDto, user });
    return this.walletRepository.save(wallet);
  }

  async findAll(): Promise<Wallet[]> {
    return this.walletRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Wallet> {
    return this.walletRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: number, walletDto: Partial<Wallet>): Promise<Wallet> {
    await this.walletRepository.update(id, walletDto);
    return this.walletRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async remove(id: number): Promise<void> {
    await this.walletRepository.delete(id);
  }
}