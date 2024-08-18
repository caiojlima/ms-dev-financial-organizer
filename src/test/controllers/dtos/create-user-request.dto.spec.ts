import { validate } from 'class-validator';
import { CreateUserRequest } from '../../../controllers/dtos/create-user-request.dto';

describe('CreateUserRequest', () => {
  it('should validate a valid CreateUserRequest', async () => {
    const dto = new CreateUserRequest();
    dto.name = 'João da Silva';
    dto.email = 'joao.silva@example.com';
    dto.password = 'SenhaSegura123!';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate a CreateUserRequest with invalid name', async () => {
    const dto = new CreateUserRequest();
    dto.name = '';
    dto.email = 'joao.silva@example.com';
    dto.password = 'SenhaSegura123!';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
    expect(errors[0].constraints?.isNotEmpty).toBe('O nome não pode ser vazio');
  });

  it('should validate a CreateUserRequest with invalid email', async () => {
    const dto = new CreateUserRequest();
    dto.name = 'João da Silva';
    dto.email = 'invalid-email';
    dto.password = 'SenhaSegura123!';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
    expect(errors[0].constraints?.isEmail).toBe('O e-mail deve ser um endereço de e-mail válido');
  });

  it('should validate a CreateUserRequest with short password', async () => {
    const dto = new CreateUserRequest();
    dto.name = 'João da Silva';
    dto.email = 'joao.silva@example.com';
    dto.password = 'short';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('password');
    expect(errors[0].constraints?.minLength).toBe('A senha deve ter pelo menos 8 caracteres');
  });

  it('should validate a CreateUserRequest with long name', async () => {
    const dto = new CreateUserRequest();
    dto.name = 'A'.repeat(51);
    dto.email = 'joao.silva@example.com';
    dto.password = 'SenhaSegura123!';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
    expect(errors[0].constraints?.maxLength).toBe('O nome pode ter no máximo 50 caracteres');
  });
});