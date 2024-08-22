import { CreateUserResponse } from '../../../controllers/dtos/create-user-response.dto';
import { CreateWalletResponse } from '../../../controllers/dtos/create-wallet-response.dto';

describe('CreateUserResponse', () => {
  it('should create an instance of CreateUserResponse', () => {
    const mockWallets: CreateWalletResponse[] = [
      {
        id: 1,
        description: 'Carteira de gastos pessoais',
        value: 150.75,
        paymentMethod: 'Cartão de crédito',
        user: {
          id: 1,
          name: 'a',
          email: 'a@a.com',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          wallet: [],
        },
        createdAt: '2024-08-13T10:00:00Z',
        updatedAt: '2024-08-13T10:00:00Z',
      },
      {
        id: 2,
        description: 'Carteira de viagem',
        value: 500.0,
        paymentMethod: 'Dinheiro',
        user: {
          id: 1,
          name: 'a',
          email: 'a@a.com',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          wallet: [],
        },
        createdAt: '2024-08-14T10:00:00Z',
        updatedAt: '2024-08-14T10:00:00Z',
      },
    ];

    const dto = new CreateUserResponse();
    dto.id = 1;
    dto.name = 'João da Silva';
    dto.email = 'joao.silva@example.com';
    dto.wallet = mockWallets;
    dto.createdAt = '2024-08-13T10:00:00Z';
    dto.updatedAt = '2024-08-13T10:00:00Z';

    expect(dto).toBeInstanceOf(CreateUserResponse);
    expect(dto.id).toBe(1);
    expect(dto.name).toBe('João da Silva');
    expect(dto.email).toBe('joao.silva@example.com');
    expect(dto.wallet).toEqual(mockWallets);
    expect(dto.createdAt).toBe('2024-08-13T10:00:00Z');
    expect(dto.updatedAt).toBe('2024-08-13T10:00:00Z');
  });

  it('should handle missing properties gracefully', () => {
    const dto = new CreateUserResponse();

    expect(dto).toBeInstanceOf(CreateUserResponse);
    expect(dto.id).toBeUndefined();
    expect(dto.name).toBeUndefined();
    expect(dto.email).toBeUndefined();
    expect(dto.wallet).toBeUndefined();
    expect(dto.createdAt).toBeUndefined();
    expect(dto.updatedAt).toBeUndefined();
  });
});
