// src/docs/inventory.docs.ts
import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { AllInventoryResponse } from '../dtos/all-inventory.dto';
import { CreateInventoryResponse } from '../dtos/create-inventory-response.dto';

export const ApiFindAllInventory = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Lista as movimentações do estoque',
      description:
        'Retorna os itens ordenados por data (desc) + o saldo total em gramas. Requer role "estoque".',
    }),
    ApiOkResponse({
      description: 'Lista retornada com sucesso',
      type: AllInventoryResponse,
    }),
    ApiUnauthorizedResponse({ description: 'Token ausente ou inválido' }),
    ApiForbiddenResponse({ description: 'Sem permissão (role estoque)' }),
  );

export const ApiCreateInventory = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Cria uma movimentação',
      description:
        'Positivo = entrada (reestoque). Negativo = saída (consumo). Sempre em gramas.',
    }),
    ApiCreatedResponse({
      description: 'Criado com sucesso',
      type: CreateInventoryResponse,
    }),
    ApiBadRequestResponse({ description: 'Dados inválidos' }),
    ApiUnauthorizedResponse({ description: 'Token ausente ou inválido' }),
    ApiForbiddenResponse({ description: 'Sem permissão' }),
  );

export const ApiUpdateInventory = () =>
  applyDecorators(
    ApiOperation({ summary: 'Atualiza uma movimentação' }),
    ApiOkResponse({ type: CreateInventoryResponse }),
    ApiBadRequestResponse({ description: 'Dados inválidos' }),
    ApiUnauthorizedResponse({ description: 'Token ausente ou inválido' }),
    ApiForbiddenResponse({ description: 'Sem permissão' }),
    ApiNotFoundResponse({ description: 'Item não encontrado' }),
  );

export const ApiDeleteInventory = () =>
  applyDecorators(
    ApiOperation({ summary: 'Remove uma movimentação' }),
    ApiNoContentResponse({ description: 'Removido com sucesso' }),
    ApiUnauthorizedResponse({ description: 'Token ausente ou inválido' }),
    ApiForbiddenResponse({ description: 'Sem permissão' }),
    ApiNotFoundResponse({ description: 'Item não encontrado' }),
  );