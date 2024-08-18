import { validate } from 'class-validator';
import { CreateWalletRequest } from '../../../controllers/dtos/create-wallet-request.dto'; // Ajuste o caminho conforme necessário

describe('CreateWalletRequest', () => {
  it('should validate a valid CreateWalletRequest', async () => {
    const dto = new CreateWalletRequest();
    dto.description = 'Carteira de gastos pessoais';
    dto.value = 150.75;
    dto.paymentMethod = 'Cartão de crédito';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate a CreateWalletRequest with invalid description', async () => {
    const dto = new CreateWalletRequest();
    dto.description = '';
    dto.value = 150.75;
    dto.paymentMethod = 'Cartão de crédito';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('description');
    expect(errors[0].constraints.isNotEmpty).toBe('A descrição não pode ser vazia');
  });

  it('should validate a CreateWalletRequest with invalid value (zero)', async () => {
    const dto = new CreateWalletRequest();
    dto.description = 'Carteira de gastos pessoais';
    dto.value = 0;
    dto.paymentMethod = 'Cartão de crédito';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('value');
    expect(errors[0].constraints.isNotZero).toBe('O valor não pode ser 0');
  });

  it('should validate a CreateWalletRequest with invalid payment method', async () => {
    const dto = new CreateWalletRequest();
    dto.description = 'Carteira de gastos pessoais';
    dto.value = 150.75;
    dto.paymentMethod = '';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('paymentMethod');
    expect(errors[0].constraints.isNotEmpty).toBe('O método de pagamento não pode ser vazio');
  });

  it('should validate a CreateWalletRequest with too short description', async () => {
    const dto = new CreateWalletRequest();
    dto.description = 'Cart';
    dto.value = 150.75;
    dto.paymentMethod = 'Cartão de crédito';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('description');
    expect(errors[0].constraints.minLength).toBe('A descrição deve ter pelo menos 5 caracteres');
  });

  it('should validate a CreateWalletRequest with too long payment method', async () => {
    const dto = new CreateWalletRequest();
    dto.description = 'Carteira de gastos pessoais';
    dto.value = 150.75;
    dto.paymentMethod = 'A'.repeat(51); // Invalid payment method (too long)

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('paymentMethod');
    expect(errors[0].constraints.maxLength).toBe('O método de pagamento pode ter no máximo 50 caracteres');
  });
});