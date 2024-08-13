import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { User } from "src/models/user.entity";
import { UserService } from "src/services/user.service";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userDto: Partial<User>): Promise<User> {
    return this.userService.create(userDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() userDto: Partial<User>): Promise<User> {
    return this.userService.update(id, userDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}