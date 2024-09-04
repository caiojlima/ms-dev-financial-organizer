import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { MailerService } from '.';

@Injectable()
export class PasswordResetService {
  private readonly TOKEN_EXPIRATION_TIME = 3600000;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mailerService: MailerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async generateResetToken(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = randomBytes(32).toString('hex');
    const tokenKey = `password-reset:${token}`;

    await this.cacheManager.set(
      tokenKey,
      user.id.toString(),
      this.TOKEN_EXPIRATION_TIME,
    );

    await this.mailerService.sendMail(
      { email },
      'Pedido de mudança de senha',
      `Para mudar sua senha clique no link a seguir: ${process.env.APP_URL}/reset-password?token=${token}`,
    );
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const tokenKey = `password-reset:${token}`;
    const userId = await this.cacheManager.get(tokenKey);

    if (!userId) throw new BadRequestException('Token inválido ou expirado');

    const user = await this.userRepository.findOneBy({ id: Number(userId) });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await this.userRepository.save({ ...user, password: hashedPassword });

    await this.cacheManager.del(tokenKey);
  }
}
