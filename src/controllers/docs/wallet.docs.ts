import { ApiResponseOptions } from '@nestjs/swagger';
import { CreateWalletRequest, CreateWalletResponse } from '../dtos';

export class WalletDocs {
  public static readonly REQUEST_POST = {
    type: CreateWalletRequest,
    examples: {
      'application/json': {
        summary: 'Exemplo de criação de carteira',
        value: {
          description: 'Carteira de gastos pessoais',
          value: 150.75,
          paymentMethod: 'Cartão de crédito',
        },
      },
    },
  };

  public static readonly RESPONSE_POST = {
    status: 201,
    description: 'A carteira foi criada com sucesso.',
    type: CreateWalletResponse,
    example: {
      id: 1,
      description: 'Carteira de gastos pessoais',
      value: 150.75,
      paymentMethod: 'Cartão de crédito',
      user: {
        id: 1,
        name: 'João da Silva Atualizado 2',
        email: 'joao.silva.novo@example.com',
        createdAt: '2024-08-13T16:26:38.000Z',
        updatedAt: '2024-08-13T17:43:21.000Z',
      },
      createdAt: '2024-08-13T10:00:00Z',
      updatedAt: '2024-08-13T10:00:00Z',
    },
  };

  public static readonly RESPONSE_GET_ALL = {
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
          id: 1,
          name: 'João da Silva Atualizado 2',
          email: 'joao.silva.novo@example.com',
          createdAt: '2024-08-13T16:26:38.000Z',
          updatedAt: '2024-08-13T17:43:21.000Z',
        },
        createdAt: '2024-08-13T10:00:00Z',
        updatedAt: '2024-08-13T10:00:00Z',
      },
      {
        id: 2,
        description: 'Carteira de viagem',
        value: 500.0,
        paymentMethod: 'Dinheiro',
        user: {
          id: 1,
          name: 'João da Silva Atualizado 2',
          email: 'joao.silva.novo@example.com',
          createdAt: '2024-08-13T16:26:38.000Z',
          updatedAt: '2024-08-13T17:43:21.000Z',
        },
        createdAt: '2024-08-14T10:00:00Z',
        updatedAt: '2024-08-14T10:00:00Z',
      },
    ],
  } as ApiResponseOptions;

  public static readonly RESPONSE_GET_BY_ID = {
    status: 200,
    description: 'Retorna a carteira correspondente ao ID.',
    type: CreateWalletResponse,
    example: {
      id: 1,
      description: 'Carteira de gastos pessoais',
      value: 150.75,
      paymentMethod: 'Cartão de crédito',
      user: {
        id: 1,
        name: 'João da Silva Atualizado 2',
        email: 'joao.silva.novo@example.com',
        createdAt: '2024-08-13T16:26:38.000Z',
        updatedAt: '2024-08-13T17:43:21.000Z',
      },
      createdAt: '2024-08-13T10:00:00Z',
      updatedAt: '2024-08-13T10:00:00Z',
    },
  };

  public static readonly REQUEST_PUT = {
    type: CreateWalletRequest,
    examples: {
      'application/json': {
        summary: 'Exemplo de atualização de carteira',
        value: {
          description: 'Carteira de viagem atualizada',
          value: 550.0,
          paymentMethod: 'Dinheiro',
        },
      },
    },
  };

  public static readonly RESPONSE_PUT = {
    status: 200,
    description: 'A carteira foi atualizada com sucesso.',
    type: CreateWalletResponse,
    example: {
      id: 54,
      description: 'Carteira de viagem atualizada',
      value: 550,
      paymentMethod: 'PIX',
      user: {
        id: 13,
        name: 'João da Silva',
        email: 'joao@example.com',
        createdAt: '2024-08-14T02:10:00.000Z',
        updatedAt: '2024-08-14T02:10:00.000Z',
      },
      createdAt: '2024-08-14T03:11:56.000Z',
      updatedAt: '2024-08-14T03:21:56.000Z',
    },
  };

  public static readonly RESPONSE_DELETE = {
    status: 204,
    description:
      'A carteira foi excluída com sucesso. Nenhum conteúdo retornado.',
    example: {},
  };
}
