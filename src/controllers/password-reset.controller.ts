import { Controller, Post, Body, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PasswordResetService } from "src/services";

@ApiTags('Auth')
@Controller('auth')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post('request-reset')
  async requestPasswordReset(@Body('email') email: string): Promise<void> {
    await this.passwordResetService.generateResetToken(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body('newPassword') newPassword: string,
  ): Promise<void> {
    await this.passwordResetService.resetPassword(token, newPassword);
  }
}