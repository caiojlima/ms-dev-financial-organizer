import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRequest {
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