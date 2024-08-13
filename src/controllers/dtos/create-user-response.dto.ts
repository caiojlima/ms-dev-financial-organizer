import { ApiProperty } from "@nestjs/swagger";
import { CreateWalletResponse } from "./create-wallet-response.dto";

export class CreateUserResponse {
    @ApiProperty({
      description: 'O identificador único do usuário',
      example: 1,
    })
    id: number;
  
    @ApiProperty({
      description: 'O nome do usuário',
      example: 'João da Silva',
    })
    name: string;
  
    @ApiProperty({
      description: 'O e-mail do usuário',
      example: 'joao.silva@example.com',
    })
    email: string;

    @ApiProperty({
        description: 'Itens da carteira do usuário',
        example: [
            {
              id: 1,
              description: 'Carteira de gastos pessoais',
              value: 150.75,
              paymentMethod: 'Cartão de crédito',
              userId: 1,
              createdAt: '2024-08-13T10:00:00Z',
              updatedAt: '2024-08-13T10:00:00Z',
            },
            {
              id: 2,
              description: 'Carteira de viagem',
              value: 500.00,
              paymentMethod: 'Dinheiro',
              userId: 1,
              createdAt: '2024-08-14T10:00:00Z',
              updatedAt: '2024-08-14T10:00:00Z',
            },
          ]
      })
      wallet: CreateWalletResponse[];
  
    @ApiProperty({
      description: 'A data em que o usuário foi criado',
      example: '2024-08-13T10:00:00Z',
    })
    createdAt: string;
  
    @ApiProperty({
      description: 'A data da última atualização do usuário',
      example: '2024-08-13T10:00:00Z',
    })
    updatedAt: string;
  }