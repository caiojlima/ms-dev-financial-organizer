import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserRequest, CreateUserResponse } from "src/controllers/dtos";
import { User } from "src/models";
import { IUserMapper } from "src/mappers/interfaces/user-mapper.interface";
import { IUserService } from "./interfaces/user-service.interface";

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly mapper: IUserMapper,
  ) {}

  async create(userDto: CreateUserRequest): Promise<CreateUserResponse> {
    await this.checkEmail(userDto.email)

    const userEntity = this.userRepository.create(userDto);

    const newUser = await this.userRepository.save(userEntity);
    
    return this.mapper.fromEntity(newUser);
  }

  async findAll(): Promise<CreateUserResponse[]> {
    const users = await this.userRepository.find({ relations: ['wallets'] });
    
    return users.map((user) => this.mapper.fromEntity(user));
  }

  async findOne(id: number): Promise<CreateUserResponse> {
    const user = await this.userRepository.findOne({ where: {id}, relations: ['wallets'] });

    if (!user) throw new NotFoundException('Usuário não encontrado');
    
    return this.mapper.fromEntity(user);
  }

  async update(id: number, userDto: CreateUserRequest): Promise<CreateUserResponse> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    const newUser = await this.userRepository.save({ ...user, ...userDto});
    
    return this.mapper.fromEntity(newUser);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Usuário não encontrado');
    
    await this.userRepository.delete(id);
  }

  async checkEmail(email: string): Promise<void> {
    const isNotValidEmail = await this.userRepository.exists({ where: { email } });
    
    if (isNotValidEmail) throw new ConflictException("Email já cadastrado!");
  }
}