import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../services';
import { AuthController } from '../../controllers/auth.controller'

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [
          {
            provide: AuthService,
            useValue: {
              login: jest.fn().mockResolvedValue({ accessToken: 'mockToken' }),
            },
          },
        ],
      }).compile();
  
      authController = module.get<AuthController>(AuthController);
      authService = module.get<AuthService>(AuthService);
    });
  
    it('should be defined', () => {
      expect(authController).toBeDefined();
    });
  
    describe('login', () => {
      it('should return an access token', async () => {
        const req = { user: { id: 1, username: 'testuser' } };
        const result = await authController.login(req);
        expect(result).toEqual({ accessToken: 'mockToken' });
        expect(authService.login).toHaveBeenCalledWith(req.user);
      });
    });
  });