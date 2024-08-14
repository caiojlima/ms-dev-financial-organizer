import { Controller, Post, Body, Get, Param, Put, Delete, HttpCode, HttpStatus, UseGuards, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateWalletRequest, CreateWalletResponse } from "./dtos";
import { IWalletService } from "src/services/interfaces/wallet-service.interface";
import { GlobalDocs } from "./docs";
import { Roles } from "src/decorators/roles.decorator";
import { RolesGuard } from "src/guards/admin.guard";
import { JwtAuthGuard } from "src/guards/jwt.guard";

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: IWalletService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar uma nova carteira' })
  @ApiBody(GlobalDocs.Wallet.REQUEST_POST)
  @ApiResponse(GlobalDocs.Wallet.RESPONSE_POST)
  @ApiResponse(GlobalDocs.FORBIDDEN)
  @ApiResponse(GlobalDocs.UNAUTHORIZED)
  async create(@Body() walletDto: CreateWalletRequest, @Req() { user }: any): Promise<CreateWalletResponse> {
    return this.walletService.create(walletDto, user.sub);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter todas as carteiras' })
  @ApiResponse(GlobalDocs.Wallet.RESPONSE_GET_ALL)
  @ApiResponse(GlobalDocs.FORBIDDEN)
  async findAll(): Promise<CreateWalletResponse[]> {
    return this.walletService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter uma carteira pelo ID' })
  @ApiResponse(GlobalDocs.Wallet.RESPONSE_GET_BY_ID)
  @ApiResponse(GlobalDocs.NOT_FOUND)
  @ApiResponse(GlobalDocs.FORBIDDEN)
  async findOne(@Param('id') id: number): Promise<CreateWalletResponse> {
    return this.walletService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar uma carteira pelo ID' })
  @ApiBody(GlobalDocs.Wallet.REQUEST_PUT)
  @ApiResponse(GlobalDocs.Wallet.RESPONSE_PUT)
  @ApiResponse(GlobalDocs.NOT_FOUND)
  @ApiResponse(GlobalDocs.FORBIDDEN)
  @ApiResponse(GlobalDocs.UNAUTHORIZED)
  async update(@Param('id') id: number, @Body() walletDto: CreateWalletRequest, @Req() { user }: any): Promise<CreateWalletResponse> {
    return this.walletService.update(id, user.sub, walletDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir uma carteira pelo ID' })
  @ApiResponse(GlobalDocs.Wallet.RESPONSE_DELETE)
  @ApiResponse(GlobalDocs.NOT_FOUND)
  @ApiResponse(GlobalDocs.FORBIDDEN)
  @ApiResponse(GlobalDocs.UNAUTHORIZED)
  async remove(@Param('id') id: number, @Req() { user }: any): Promise<void> {
    return this.walletService.remove(id, user.sub);
  }
}