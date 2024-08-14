import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: 'Email do usuário',
    example: 'fulano@example.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;
  
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'MinhaSenha123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}