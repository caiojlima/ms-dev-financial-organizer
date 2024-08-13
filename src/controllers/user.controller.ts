import { Controller, Post, Body, Get, Param, Put, Delete, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IUserController } from "./interfaces/user-controller.interface";
import { CreateUserRequest, CreateUserResponse } from "./dtos";
import { IUserService } from "src/services/interfaces/user-service.interface";
import { GlobalDocs } from "./docs";

@ApiTags('Users')
@Controller('users')
export class UserController implements IUserController {
  constructor(private readonly userService: IUserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastra novo usuário' })
  @ApiBody(GlobalDocs.User.REQUEST_BODY_POST)
  @ApiResponse(GlobalDocs.User.RESPONSE_POST)
  @ApiResponse(GlobalDocs.FORBIDDEN)
  @ApiResponse(GlobalDocs.CONFLICT)
  async create(@Body() userDto: CreateUserRequest): Promise<CreateUserResponse> {
    return this.userService.create(userDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os usuários' })
  @ApiResponse(GlobalDocs.User.RESPONSE_GET_ALL)
  @ApiResponse(GlobalDocs.FORBIDDEN)
  async findAll(): Promise<CreateUserResponse[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um usuário pelo ID' })
  @ApiResponse(GlobalDocs.User.RESPONSE_GET_BY_ID)
  @ApiResponse(GlobalDocs.NOT_FOUND)
  @ApiResponse(GlobalDocs.FORBIDDEN)
  async findOne(@Param('id') id: number): Promise<CreateUserResponse> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um usuário pelo ID' })
  @ApiBody(GlobalDocs.User.REQUEST_PUT)
  @ApiResponse(GlobalDocs.User.RESPONSE_PUT)
  @ApiResponse(GlobalDocs.NOT_FOUND)
  @ApiResponse(GlobalDocs.FORBIDDEN)
  async update(@Param('id') id: number, @Body() userDto: CreateUserRequest): Promise<CreateUserResponse> {
    return this.userService.update(id, userDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir um usuário pelo ID' })
  @ApiResponse(GlobalDocs.User.RESPONSE_DELETE)
  @ApiResponse(GlobalDocs.NOT_FOUND)
  @ApiResponse(GlobalDocs.FORBIDDEN)
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }

  @Get('/email-validation/:email')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Verificar se email está cadastrado' })
  @ApiResponse(GlobalDocs.User.RESPONSE_DELETE)
  @ApiResponse(GlobalDocs.CONFLICT)
  @ApiResponse(GlobalDocs.FORBIDDEN)
  async checkEmail(@Param('email') email: string): Promise<void> {
    await this.userService.checkEmail(email);
  }
}