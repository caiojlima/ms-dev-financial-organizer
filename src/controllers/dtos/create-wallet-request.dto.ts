import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, MaxLength, IsNumber, IsDefined, IsInt } from "class-validator";
import { IsNotZero } from "src/validators/not-zero.validator";

export class CreateWalletRequest {
  @ApiProperty({
    description: 'A descrição da carteira',
    example: 'Carteira de gastos pessoais',
  })
  @IsString({ message: 'A descrição deve ser uma string' })
  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  @MinLength(5, { message: 'A descrição deve ter pelo menos 5 caracteres' })
  @MaxLength(100, { message: 'A descrição pode ter no máximo 100 caracteres' })
  description: string;

  @ApiProperty({
    description: 'O valor da carteira',
    example: 150.75,
  })
  @IsNumber({}, { message: 'O valor deve ser um número' })
  @IsNotZero({ message: 'O valor não pode ser 0' })
  value: number;

  @ApiProperty({
    description: 'O método de pagamento associado à carteira',
    example: 'Cartão de crédito',
  })
  @IsString({ message: 'O método de pagamento deve ser uma string' })
  @IsNotEmpty({ message: 'O método de pagamento não pode ser vazio' })
  @MinLength(3, { message: 'O método de pagamento deve ter pelo menos 3 caracteres' })
  @MaxLength(50, { message: 'O método de pagamento pode ter no máximo 50 caracteres' })
  paymentMethod: string;

  @ApiProperty({
    description: 'O identificador do usuário associado à carteira',
    example: 1,
  })
  @IsInt({ message: 'O identificador do usuário deve ser um número inteiro' })
  @IsNotEmpty({ message: 'O identificador do usuário não pode ser vazio' })
  userId: number;
}