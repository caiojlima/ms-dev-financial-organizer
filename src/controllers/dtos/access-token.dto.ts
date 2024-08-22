import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty({
    description: 'Chave de Autenticação',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEzLCJlbWFpbCI6ImpvYW9AZXhhbXBsZS5jb20iLCJuYW1lIjoiSm_Do28gZGEgU2lsdmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTcyMzU5MDYyMywiZXhwIjoxNzIzNjMzODIzfQ.xB_5sLnxASIePNj3gepIqEz8BAR7nJLqzJHy3YoHQUA',
  })
  accessKey: string;
}
