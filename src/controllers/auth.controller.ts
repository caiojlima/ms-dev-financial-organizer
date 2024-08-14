import { Controller, Post, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "src/services/auth.service";
import { LocalAuthGuard } from "src/guards/local.guard";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GlobalDocs } from "./docs";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login de usuário' })
  @ApiBody(GlobalDocs.Auth.LOGIN_REQUEST)
  @ApiResponse(GlobalDocs.Auth.LOGIN_RESPONSE)
  @ApiResponse(GlobalDocs.UNAUTHORIZED)
  async login(@Req() req: any) {
    return this.authService.login(req.user);
  }
}