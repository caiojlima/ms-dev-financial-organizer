import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../models";
import { Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { CreateUserResponse } from "src/controllers/dtos";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<CreateUserResponse | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    const isValid = await bcrypt.compare(password, user.password)
    if (user && isValid) {
      const { password, ...result } = user;

      return result as unknown as CreateUserResponse;
    }

    return null;
  }

  async login(user: CreateUserResponse) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.email === process.env.ADMIN_EMAIL ? 'admin' : 'user'
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}