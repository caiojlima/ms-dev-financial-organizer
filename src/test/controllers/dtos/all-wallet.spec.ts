import { AllWallet } from '../../../controllers/dtos/all-wallet.dto';
import { CreateWalletResponse } from '../../../controllers/dtos/create-wallet-response.dto';

describe('AllWallet', () => {
  it('should create an instance of AllWallet', () => {
    const mockEntries: CreateWalletResponse[] = [
      { id: 1, description: 'description1', value: 200, paymentMethod: 'pix', createdAt: new Date().toISOString(), updatedAt: new Date(). toISOString(), user: {
          id: 1, name: 'a', email: 'a@a.com', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
          wallet: []
      } },
    ];

    const dto = new AllWallet();
    dto.entries = mockEntries;
    dto.total = mockEntries.length;

    expect(dto).toBeInstanceOf(AllWallet);
    expect(dto.entries).toEqual(mockEntries);
    expect(dto.total).toBe(mockEntries.length);
  });

  it('should handle empty entries', () => {
    const dto = new AllWallet();
    dto.entries = [];
    dto.total = 0;

    expect(dto).toBeInstanceOf(AllWallet);
    expect(dto.entries).toEqual([]);
    expect(dto.total).toBe(0);
  });
});