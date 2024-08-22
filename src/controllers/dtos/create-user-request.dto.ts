import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class CreateUserRequest {
  @ApiProperty({
    description: 'O nome do usuário',
    example: 'João da Silva',
  })
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @MinLength(2, { message: 'O nome deve ter pelo menos 2 caracteres' })
  @MaxLength(50, { message: 'O nome pode ter no máximo 50 caracteres' })
  name: string;

  @ApiProperty({
    description: 'O e-mail do usuário',
    example: 'joao.silva@example.com',
  })
  @IsEmail({}, { message: 'O e-mail deve ser um endereço de e-mail válido' })
  @IsNotEmpty({ message: 'O e-mail não pode ser vazio' })
  email: string;

  @ApiProperty({
    description: 'A senha do usuário',
    example: 'SenhaSegura123!',
  })
  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  @MaxLength(20, { message: 'A senha pode ter no máximo 20 caracteres' })
  password: string;
}
