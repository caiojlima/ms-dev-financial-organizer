import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { randomBytes } from "crypto";
import { MailerService, RedisService, UserService } from ".";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/models";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordResetService {
  private readonly TOKEN_EXPIRATION_TIME = 3600;
  redisService: any;
  mailerService: any;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async generateResetToken(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = randomBytes(32).toString('hex');
    const tokenKey = `password-reset:${token}`;
    
    await this.redisService.set(tokenKey, user.id.toString(), this.TOKEN_EXPIRATION_TIME);

    await this.mailerService.sendMail(
      email,
      'Pedido de mudança de senha',
      `Para mudar sua senha clique no link a seguir: ${process.env.APP_URL}/auth/reset-password?token=${token}`
    );
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const tokenKey = `password-reset:${token}`;
    const userId = await this.redisService.get(tokenKey);
    
    if (!userId) throw new BadRequestException('Token inválido ou expirado');

    const user = await this.userRepository.findBy({ id: Number(userId) });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await this.userRepository.save({ ...user, password: hashedPassword });

    await this.redisService.del(tokenKey);
  }
}