// src/controllers/dtos/create-inventory-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateInventoryResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Reestoque' })
  descricao: string;

  @ApiProperty({ example: 50 })
  quantidadeGramas: number;

  @ApiProperty({
    description: 'Data de criação (ISO)',
    example: '2026-10-10T14:30:00.000Z',
  })
  createdAt: string;

  @ApiProperty({ example: '2026-10-10T14:30:00.000Z' })
  updatedAt: string;
}