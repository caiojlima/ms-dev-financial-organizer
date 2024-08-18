import { WalletQuery } from '../../../controllers/dtos/wallet-query.dto';
import { validate } from 'class-validator';

describe('WalletQuery', () => {
  it('should validate a valid WalletQuery', async () => {
    const query = new WalletQuery();
    query.start = '2024-08-01T00:00:00Z';
    query.end = '2024-08-31T23:59:59Z';
    query.page = 1;
    query.limit = 10;

    const errors = await validate(query);
    expect(errors.length).toBe(0); 
  });

  it('should fail validation for invalid start date', async () => {
    const query = new WalletQuery();
    query.start = 'invalid-date';

    const errors = await validate(query);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('start');
  });

  it('should fail validation for invalid end date', async () => {
    const query = new WalletQuery();
    query.end = 'invalid-date';

    const errors = await validate(query);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('end');
  });

  it('should fail validation for page less than 1', async () => {
    const query = new WalletQuery();
    query.page = 0;

    const errors = await validate(query);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('page');
  });

  it('should fail validation for limit less than 1', async () => {
    const query = new WalletQuery();
    query.limit = 0;

    const errors = await validate(query);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('limit');
  });

  it('should set default values if not provided', async () => {
    const query = new WalletQuery();
    const errors = await validate(query);

    expect(errors.length).toBe(0);
    expect(query.page).toBe(1);
    expect(query.limit).toBe(10);
  });
});