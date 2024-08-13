import { Controller, Post, Body, Get, Param, Put, Delete, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IUserController } from "./interfaces/user-controller.interface";
import { CreateUserRequest, CreateUserResponse } from "./dtos";
import { IUserService } from "src/services/interfaces/user-service.interface";

@ApiTags('Users')
@Controller('users')
export class UserController implements IUserController {
  constructor(private readonly userService: IUserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastra novo usuário' })
  @ApiBody({
    type: CreateUserRequest,
    examples: {
      'application/json': {
        summary: 'Exemplo de criação de usuário',
        value: {
          name: 'João da Silva',
          email: 'joao.silva@example.com',
          password: 'SenhaSegura123',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'O usuário foi criado com sucesso.',
    type: CreateUserResponse,
    example: {
      id: 1,
      name: 'João da Silva',
      email: 'joao.silva@example.com',
      createdAt: '2024-08-13T10:00:00Z',
      updatedAt: '2024-08-13T10:00:00Z',
    },
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() userDto: CreateUserRequest): Promise<CreateUserResponse> {
    return this.userService.create(userDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Retorna todos os usuários.',
    type: [CreateUserResponse],
    example: [
      {
        id: 1,
        name: 'João da Silva',
        email: 'joao.silva@example.com',
        wallet: [
          {
            "id": 3,
            "description": "Lanche",
            "value": "150.75",
            "paymentMethod": "CRÉDITO",
            "createdAt": "2024-08-13T17:05:45.000Z",
            "updatedAt": "2024-08-13T17:05:45.000Z"
          }
    ],
        createdAt: '2024-08-13T10:00:00Z',
        updatedAt: '2024-08-13T10:00:00Z',
      },
      {
        id: 2,
        name: 'Maria Oliveira',
        email: 'maria.oliveira@example.com',
        wallet: [
          {
            "id": 4,
            "description": "Carteira de gastos pessoais",
            "value": "150.75",
            "paymentMethod": "Cartão de crédito",
            "createdAt": "2024-08-13T17:59:00.000Z",
            "updatedAt": "2024-08-13T17:59:00.000Z"
          },
          {
            "id": 5,
            "description": "Carteira de gastos pessoais",
            "value": "150.75",
            "paymentMethod": "Cartão de crédito",
            "createdAt": "2024-08-13T18:02:45.000Z",
            "updatedAt": "2024-08-13T18:02:45.000Z"
          }
        ],
        createdAt: '2024-08-14T10:00:00Z',
        updatedAt: '2024-08-14T10:00:00Z',
      },
    ],
})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(): Promise<CreateUserResponse[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um usuário pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Retorna o usuário correspondente ao ID.',
    type: CreateUserResponse,
    example: {
      id: 1,
      name: 'João da Silva',
      email: 'joao.silva@example.com',
      wallet: [
        {
          "id": 2,
          "description": "Lanche",
          "value": "150.75",
          "paymentMethod": "CRÉDITO",
          "createdAt": "2024-08-13T17:05:38.000Z",
          "updatedAt": "2024-08-13T17:05:38.000Z"
        },
        {
          "id": 6,
          "description": "Carteira de gastos pessoais",
          "value": "150.75",
          "paymentMethod": "Cartão de crédito",
          "createdAt": "2024-08-13T18:03:29.000Z",
          "updatedAt": "2024-08-13T18:03:29.000Z"
        }
      ],
      createdAt: '2024-08-13T10:00:00Z',
      updatedAt: '2024-08-13T10:00:00Z',
    },
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(@Param('id') id: number): Promise<CreateUserResponse> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um usuário pelo ID' })
  @ApiBody({
    type: CreateUserRequest,
    examples: {
      'application/json': {
        summary: 'Exemplo de atualização de usuário',
        value: {
          name: 'João da Silva Atualizado',
          email: 'joao.silva.novo@example.com',
          password: 'SenhaNova123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'O usuário foi atualizado com sucesso.',
    type: CreateUserResponse,
    example: {
      id: 1,
      name: 'João da Silva Atualizado',
      email: 'joao.silva.novo@example.com',
      createdAt: "2024-08-13T16:26:38.000Z",
      updatedAt: "2024-08-13T17:43:21.000Z"
        },
      })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(@Param('id') id: number, @Body() userDto: CreateUserRequest): Promise<CreateUserResponse> {
    return this.userService.update(id, userDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir um usuário pelo ID' })
  @ApiResponse({
    status: 204,
    description: 'O usuário foi excluído com sucesso. Nenhum conteúdo retornado.',
    example: {},
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 403, description: 'Proibido.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}