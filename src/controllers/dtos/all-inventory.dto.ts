// src/controllers/dtos/all-inventory.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { CreateInventoryResponse } from './create-inventory-response.dto';

export class AllInventoryResponse {
  @ApiProperty({ type: [CreateInventoryResponse] })
  items: CreateInventoryResponse[];

  @ApiProperty({
    description: 'Saldo atual em gramas (soma de todas as movimentações)',
    example: 220,
  })
  totalGramas: number;
}