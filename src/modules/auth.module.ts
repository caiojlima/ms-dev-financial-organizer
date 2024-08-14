import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { AuthService } from 'src/services/auth.service';
import { AuthController } from 'src/controllers/auth.controller';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy,],
})
export class AuthModule {}