import { TestingModule, Test } from '@nestjs/testing';
import { PasswordResetController } from '../../controllers/password-reset.controller';
import { PasswordResetService } from '../../services';

describe('PasswordResetController', () => {
  let passwordResetController: PasswordResetController;
  let passwordResetService: PasswordResetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordResetController],
      providers: [
        {
          provide: PasswordResetService,
          useValue: {
            generateResetToken: jest.fn().mockResolvedValue(undefined),
            resetPassword: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    passwordResetController = module.get<PasswordResetController>(
      PasswordResetController,
    );
    passwordResetService =
      module.get<PasswordResetService>(PasswordResetService);
  });

  it('should be defined', () => {
    expect(passwordResetController).toBeDefined();
  });

  describe('requestPasswordReset', () => {
    it('should call generateResetToken with the correct email', async () => {
      const email = 'test@example.com';
      await passwordResetController.requestPasswordReset(email);
      expect(passwordResetService.generateResetToken).toHaveBeenCalledWith(
        email,
      );
    });
  });

  describe('resetPassword', () => {
    it('should call resetPassword with the correct parameters', async () => {
      const req = { headers: { authorization: 'Bearer token' } };
      const newPassword = 'newPassword123';
      await passwordResetController.resetPassword(req, newPassword);
      expect(passwordResetService.resetPassword).toHaveBeenCalledWith(
        'Bearer token',
        newPassword,
      );
    });
  });
});
