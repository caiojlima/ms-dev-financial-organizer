import { ApiProperty } from "@nestjs/swagger";
import { CreateUserResponse } from "./create-user-response.dto";

export class CreateWalletResponse {
    @ApiProperty({
      description: 'O identificador único da carteira',
      example: 1,
    })
    id: number;
  
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
    user: CreateUserResponse;
  
    @ApiProperty({
      description: 'A data em que a carteira foi criada',
      example: '2024-08-13T10:00:00Z',
    })
    createdAt: string;
  
    @ApiProperty({
      description: 'A data da última atualização da carteira',
      example: '2024-08-13T10:00:00Z',
    })
    updatedAt: string;
  }