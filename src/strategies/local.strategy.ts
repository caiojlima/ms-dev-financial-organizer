import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { Strategy } from 'passport-local';
import { CreateUserResponse } from 'src/controllers/dtos';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<CreateUserResponse> {
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new UnauthorizedException();
    
    return user;
  }
}