import { LoginDto } from '../../../controllers/dtos/login.dto'; // Ajuste o caminho conforme necessário
import { validate } from 'class-validator';

describe('LoginDto', () => {
  it('should validate a valid LoginDto', async () => {
    const dto = new LoginDto();
    dto.email = 'fulano@example.com';
    dto.password = 'MinhaSenha123';

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // Deve ser 0 se o DTO for válido
  });

  it('should fail validation for missing email', async () => {
    const dto = new LoginDto();
    dto.password = 'MinhaSenha123';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
  });

  it('should fail validation for missing password', async () => {
    const dto = new LoginDto();
    dto.email = 'fulano@example.com';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('password');
  });

  it('should fail validation for empty email', async () => {
    const dto = new LoginDto();
    dto.email = '';
    dto.password = 'MinhaSenha123';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
  });

  it('should fail validation for empty password', async () => {
    const dto = new LoginDto();
    dto.email = 'fulano@example.com';
    dto.password = '';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('password');
  });
});
