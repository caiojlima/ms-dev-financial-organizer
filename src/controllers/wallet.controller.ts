import { Controller, Post, Body, Get, Param, Put, Delete, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IWalletController } from "./interfaces/wallet-controller.interface";
import { CreateWalletRequest, CreateWalletResponse } from "./dtos";
import { IWalletService } from "src/services/interfaces/wallet-service.interface";

@ApiTags('Wallet')
@Controller('wallet')
export class WalletController implements IWalletController {
  constructor(private readonly walletService: IWalletService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova carteira' })
  @ApiBody({
    type: CreateWalletRequest,
    examples: {
      'application/json': {
        summary: 'Exemplo de criação de carteira',
        value: {
          description: 'Carteira de gastos pessoais',
          value: 150.75,
          paymentMethod: 'Cartão de crédito',
          userId: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'A carteira foi criada com sucesso.',
    type: CreateWalletResponse,
    example: {
      id: 1,
      description: 'Carteira de gastos pessoais',
      value: 150.75,
      paymentMethod: 'Cartão de crédito',
      user: {
        "id": 1,
        "name": "João da Silva Atualizado 2",
        "email": "joao.silva.novo@example.com",
        "createdAt": "2024-08-13T16:26:38.000Z",
        "updatedAt": "2024-08-13T17:43:21.000Z"
      },
      createdAt: '2024-08-13T10:00:00Z',
      updatedAt: '2024-08-13T10:00:00Z',
    },
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() walletDto: CreateWalletRequest): Promise<CreateWalletResponse> {
    return this.walletService.create(walletDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todas as carteiras' })
  @ApiResponse({
    status: 200,
    description: 'Retorna todas as carteiras.',
    type: [CreateWalletResponse],
    example: [
      {
        id: 1,
        description: 'Carteira de gastos pessoais',
        value: 150.75,
        paymentMethod: 'Cartão de crédito',
        user: {
          "id": 1,
          "name": "João da Silva Atualizado 2",
          "email": "joao.silva.novo@example.com",
          "createdAt": "2024-08-13T16:26:38.000Z",
          "updatedAt": "2024-08-13T17:43:21.000Z"
        },
        createdAt: '2024-08-13T10:00:00Z',
        updatedAt: '2024-08-13T10:00:00Z',
      },
      {
        id: 2,
        description: 'Carteira de viagem',
        value: 500.00,
        paymentMethod: 'Dinheiro',
        user: {
          "id": 1,
          "name": "João da Silva Atualizado 2",
          "email": "joao.silva.novo@example.com",
          "createdAt": "2024-08-13T16:26:38.000Z",
          "updatedAt": "2024-08-13T17:43:21.000Z"
        },
        createdAt: '2024-08-14T10:00:00Z',
        updatedAt: '2024-08-14T10:00:00Z',
      },
    ],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<CreateWalletResponse[]> {
    return this.walletService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma carteira pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Retorna a carteira correspondente ao ID.',
    type: CreateWalletResponse,
    example: {
      id: 1,
      description: 'Carteira de gastos pessoais',
      value: 150.75,
      paymentMethod: 'Cartão de crédito',
      user: {
        "id": 1,
        "name": "João da Silva Atualizado 2",
        "email": "joao.silva.novo@example.com",
        "createdAt": "2024-08-13T16:26:38.000Z",
        "updatedAt": "2024-08-13T17:43:21.000Z"
      },
      createdAt: '2024-08-13T10:00:00Z',
      updatedAt: '2024-08-13T10:00:00Z',
    },
  })
  @ApiResponse({ status: 404, description: 'Carteira não encontrada.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id') id: number): Promise<CreateWalletResponse> {
    return this.walletService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma carteira pelo ID' })
  @ApiBody({
    type: CreateWalletRequest,
    examples: {
      'application/json': {
        summary: 'Exemplo de atualização de carteira',
        value: {
          description: 'Carteira de viagem atualizada',
          value: 550.00,
          paymentMethod: 'Dinheiro',
          userId: 1,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'A carteira foi atualizada com sucesso.',
    type: CreateWalletResponse,
    example: {
      id: 1,
      description: 'Carteira de viagem atualizada',
      value: 550.00,
      paymentMethod: 'Dinheiro',
      createdAt: '2024-08-13T10:00:00Z',
      updatedAt: '2024-08-14T11:00:00Z',
    },
  })
  @ApiResponse({ status: 404, description: 'Carteira não encontrada.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(@Param('id') id: number, @Body() walletDto: CreateWalletRequest): Promise<CreateWalletResponse> {
    return this.walletService.update(id, walletDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir uma carteira pelo ID' })
  @ApiResponse({
    status: 204,
    description: 'A carteira foi excluída com sucesso. Nenhum conteúdo retornado.',
    example: {},
  })
  @ApiResponse({ status: 404, description: 'Carteira não encontrada.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.walletService.remove(id);
  }
}