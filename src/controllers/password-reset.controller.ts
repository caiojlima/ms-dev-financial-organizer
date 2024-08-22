import { Controller, Post, Body, Query, Patch, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PasswordResetService } from '../services';
import { GlobalDocs } from './docs';

@ApiTags('Auth')
@Controller('auth')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post('request-reset')
  @ApiOperation({ summary: 'Geração de token para mudança de senha' })
  @ApiBody(GlobalDocs.Auth.REQUEST_RESET_REQUEST)
  @ApiResponse(GlobalDocs.Auth.LOGIN_RESPONSE)
  async requestPasswordReset(@Body('email') email: string): Promise<void> {
    await this.passwordResetService.generateResetToken(email);
  }

  @Patch('reset-password')
  @ApiOperation({ summary: 'Mudança de senha de usuário' })
  @ApiBody(GlobalDocs.Auth.PASSWORD_RESET_REQUEST)
  async resetPassword(
    @Req() req: any,
    @Body('password') newPassword: string,
  ): Promise<void> {
    await this.passwordResetService.resetPassword(
      req.headers.authorization,
      newPassword,
    );
  }
}
