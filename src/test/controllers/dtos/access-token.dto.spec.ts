import { AccessTokenDto } from '../../../controllers/dtos/access-token.dto';

describe('AccessTokenDto', () => {
  it('should create an instance of AccessTokenDto', () => {
    const dto = new AccessTokenDto();
    dto.accessKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEzLCJlbWFpbCI6ImpvYW9AZXhhbXBsZS5jb20iLCJuYW1lIjoiSm_Do28gZGEgU2lsdmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTcyMzU5MDYyMywiZXhwIjoxNzIzNjMzODIzfQ.xB_5sLnxASIePNj3gepIqEz8BAR7nJLqzJHy3YoHQUA';
    expect(dto).toBeInstanceOf(AccessTokenDto);
    expect(dto.accessKey).toBeDefined();
    expect(dto.accessKey).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEzLCJlbWFpbCI6ImpvYW9AZXhhbXBsZS5jb20iLCJuYW1lIjoiSm_Do28gZGEgU2lsdmEiLCJyb2xlIjoidXNlciIsImlhdCI6MTcyMzU5MDYyMywiZXhwIjoxNzIzNjMzODIzfQ.xB_5sLnxASIePNj3gepIqEz8BAR7nJLqzJHy3YoHQUA');
  });
});