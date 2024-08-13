import { ApiResponseOptions } from "@nestjs/swagger"
import { CreateUserRequest, CreateUserResponse } from "../dtos"

export class UserDocs {
    public static readonly REQUEST_BODY_POST = {
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
	}

	public static readonly RESPONSE_POST = {
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
  }

	public static readonly RESPONSE_GET_ALL = {
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
	} as ApiResponseOptions;

	public static readonly RESPONSE_GET_BY_ID = {
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
  }

	public static readonly REQUEST_PUT = {
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
  }

	public static readonly RESPONSE_PUT = {
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
  }

	public static readonly RESPONSE_DELETE = {
    status: 204,
    description: 'O usuário foi excluído com sucesso. Nenhum conteúdo retornado.',
    example: {},
  }
}