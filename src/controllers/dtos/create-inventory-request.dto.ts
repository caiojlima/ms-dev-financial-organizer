// src/controllers/dtos/create-inventory-request.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, NotEquals } from 'class-validator';

export class CreateInventoryRequest {
  @ApiProperty({ description: 'Descrição da movimentação', example: 'Reestoque' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({
    description: 'Positivo = entrada, negativo = saída. Sempre em gramas.',
    example: 50,
  })
  @IsInt()
  @NotEquals(0)
  quantidadeGramas: number;
}