import { WalletCriteriaBuilder } from '../../builders/wallet-criteria.builder';
import { Between } from 'typeorm';

describe('WalletCriteriaBuilder', () => {
  it('should build criteria with userId only', () => {
    const filters = { userId: 1 };
    const builder = new WalletCriteriaBuilder(filters);
    const result = builder.build();
    expect(result).toEqual({
      user: { id: 1 },
    });
  });

  it('should build criteria with start and end dates', () => {
    const filters = { userId: 1, start: '2024-01-01', end: '2024-12-31' };
    const builder = new WalletCriteriaBuilder(filters);
    const result = builder.build();
    expect(result).toEqual({
      user: { id: 1 },
      createdAt: Between(new Date('2024-01-01'), new Date('2024-12-31')),
    });
  });

  it('should build criteria with both filters', () => {
    const filters = { userId: 1, start: '2024-01-01', end: '2024-12-31' };
    const builder = new WalletCriteriaBuilder(filters);
    const result = builder.build();
    expect(result).toEqual({
      user: { id: 1 },
      createdAt: Between(new Date('2024-01-01'), new Date('2024-12-31')),
    });
  });

  it('should build criteria with missing start date', () => {
    const filters = { userId: 1, end: '2024-12-31' };
    const builder = new WalletCriteriaBuilder(filters);
    const result = builder.build();
    expect(result).toEqual({
      user: { id: 1 },
    });
  });

  it('should build criteria with missing end date', () => {
    const filters = { userId: 1, start: '2024-01-01' };
    const builder = new WalletCriteriaBuilder(filters);
    const result = builder.build();
    expect(result).toEqual({
      user: { id: 1 },
    });
  });
});
