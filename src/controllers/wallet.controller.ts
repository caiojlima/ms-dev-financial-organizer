import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { Wallet } from "src/models/wallet.entity";
import { WalletService } from "src/services/wallet.service";

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async create(@Body() walletDto: Partial<Wallet>, @Body('userId') userId: number): Promise<Wallet> {
    return this.walletService.create(walletDto, userId);
  }

  @Get()
  async findAll(): Promise<Wallet[]> {
    return this.walletService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Wallet> {
    return this.walletService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() walletDto: Partial<Wallet>): Promise<Wallet> {
    return this.walletService.update(id, walletDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.walletService.remove(id);
  }
}