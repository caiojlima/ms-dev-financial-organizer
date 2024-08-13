import { ApiProperty } from "@nestjs/swagger";

export class CreateWalletRequest {
    @ApiProperty({
      description: 'A descrição da carteira',
      example: 'Carteira de gastos pessoais',
    })
    description: string;
  
    @ApiProperty({
      description: 'O valor da carteira',
      example: 150.75,
    })
    value: number;
  
    @ApiProperty({
      description: 'O método de pagamento associado à carteira',
      example: 'Cartão de crédito',
    })
    paymentMethod: string;
  
    @ApiProperty({
      description: 'O identificador do usuário associado à carteira',
      example: 1,
    })
    userId: number;
  }