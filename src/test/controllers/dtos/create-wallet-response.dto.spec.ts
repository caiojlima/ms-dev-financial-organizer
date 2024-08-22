import { CreateWalletResponse } from '../../../controllers/dtos/create-wallet-response.dto';

describe('CreateWalletResponse', () => {
  it('should create a valid CreateWalletResponse', () => {
    const response = new CreateWalletResponse();
    response.id = 1;
    response.description = 'Carteira de gastos pessoais';
    response.value = 150.75;
    response.paymentMethod = 'Cartão de crédito';
    response.user = {
      id: 1,
      name: 'João da Silva',
      email: 'joao.silva@example.com',
      wallet: [],
      createdAt: '2024-08-13T10:00:00Z',
      updatedAt: '2024-08-13T10:00:00Z',
    };
    response.createdAt = '2024-08-13T10:00:00Z';
    response.updatedAt = '2024-08-13T10:00:00Z';

    expect(response.id).toBe(1);
    expect(response.description).toBe('Carteira de gastos pessoais');
    expect(response.value).toBe(150.75);
    expect(response.paymentMethod).toBe('Cartão de crédito');
    expect(response.user).toEqual({
      id: 1,
      name: 'João da Silva',
      email: 'joao.silva@example.com',
      wallet: [],
      createdAt: '2024-08-13T10:00:00Z',
      updatedAt: '2024-08-13T10:00:00Z',
    });
    expect(response.createdAt).toBe('2024-08-13T10:00:00Z');
    expect(response.updatedAt).toBe('2024-08-13T10:00:00Z');
  });
});
