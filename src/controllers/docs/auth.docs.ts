import { LoginDto } from '../dtos';
import { AccessTokenDto } from '../dtos/access-token.dto';

export class AuthDocs {
  public static readonly LOGIN_REQUEST = {
    type: LoginDto,
    examples: {
      'application/json': {
        summary: 'Exemplo de login',
        value: {
          email: 'joao@example.com',
          password: 'joao1234',
        },
      },
    },
  };

  public static readonly LOGIN_RESPONSE = {
    status: 201,
    type: AccessTokenDto,
    description: 'O usuário foi autenticado com sucesso.',
    examples: {
      'application/json': {
        summary: 'Exemplo de login',
        value: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEzLCJlbWFpbCI6ImpvYW9AZXhhbXBsZS5jb20iLCJuYW1lIjoiSm_Do28gZGEgU2lsdmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTcyMzU5MDYyMywiZXhwIjoxNzIzNjMzODIzfQ.xB_5sLnxASIePNj3gepIqEz8BAR7nJLqzJHy3YoHQUA',
        },
      },
    },
  };

  public static readonly REQUEST_RESET_REQUEST = {
    type: LoginDto,
    examples: {
      'application/json': {
        summary: 'Exemplo de login',
        value: {
          email: 'joao@example.com',
        },
      },
    },
  };

  public static readonly PASSWORD_RESET_REQUEST = {
    type: LoginDto,
    examples: {
      'application/json': {
        summary: 'Exemplo de login',
        value: {
          password: 'SenhaSegura123',
        },
      },
    },
  };
}
