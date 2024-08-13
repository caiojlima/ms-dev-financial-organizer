import { Controller, Post, Body, Get, Param, Put, Delete, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IWalletController } from "./interfaces/wallet-controller.interface";
import { CreateWalletRequest, CreateWalletResponse } from "./dtos";
import { IWalletService } from "src/services/interfaces/wallet-service.interface";
import { GlobalDocs } from "./docs";

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController implements IWalletController {
  constructor(private readonly walletService: IWalletService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova carteira' })
  @ApiBody(GlobalDocs.Wallet.REQUEST_POST)
  @ApiResponse(GlobalDocs.Wallet.RESPONSE_POST)
  @ApiResponse(GlobalDocs.FORBIDDEN)
  async create(@Body() walletDto: CreateWalletRequest): Promise<CreateWalletResponse> {
    return this.walletService.create(walletDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todas as carteiras' })
  @ApiResponse(GlobalDocs.Wallet.RESPONSE_GET_ALL)
  @ApiResponse(GlobalDocs.FORBIDDEN)
  async findAll(): Promise<CreateWalletResponse[]> {
    return this.walletService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma carteira pelo ID' })
  @ApiResponse(GlobalDocs.Wallet.RESPONSE_GET_BY_ID)
  @ApiResponse(GlobalDocs.NOT_FOUND)
  @ApiResponse(GlobalDocs.FORBIDDEN)
  async findOne(@Param('id') id: number): Promise<CreateWalletResponse> {
    return this.walletService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma carteira pelo ID' })
  @ApiBody(GlobalDocs.Wallet.REQUEST_PUT)
  @ApiResponse(GlobalDocs.Wallet.RESPONSE_PUT)
  @ApiResponse(GlobalDocs.NOT_FOUND)
  @ApiResponse(GlobalDocs.FORBIDDEN)
  async update(@Param('id') id: number, @Body() walletDto: CreateWalletRequest): Promise<CreateWalletResponse> {
    return this.walletService.update(id, walletDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir uma carteira pelo ID' })
  @ApiResponse(GlobalDocs.Wallet.RESPONSE_DELETE)
  @ApiResponse(GlobalDocs.NOT_FOUND)
  @ApiResponse(GlobalDocs.FORBIDDEN)
  async remove(@Param('id') id: number): Promise<void> {
    return this.walletService.remove(id);
  }
}