import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../controllers/user.controller';
import { IUserService } from '../../services/interfaces/user-service.interface';
import { CreateUserRequest, CreateUserResponse } from '../../controllers/dtos';

describe('UserController', () => {
  let userController: UserController;
  let userService: IUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: IUserService,
          useValue: {
            create: jest.fn().mockResolvedValue({ id: 1, name: 'Test User' } as CreateUserResponse),
            findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Test User' }] as CreateUserResponse[]),
            findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Test User' } as CreateUserResponse),
            update: jest.fn().mockResolvedValue({ id: 1, name: 'Updated User' } as CreateUserResponse),
            remove: jest.fn().mockResolvedValue(undefined),
            checkEmail: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<IUserService>(IUserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const userDto: CreateUserRequest = {
          name: 'Test User', email: 'test@example.com',
          password: ''
      };
      const result = await userController.create(userDto);
      expect(result).toEqual({ id: 1, name: 'Test User' });
      expect(userService.create).toHaveBeenCalledWith(userDto);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const result = await userController.findAll();
      expect(result).toEqual([{ id: 1, name: 'Test User' }]);
      expect(userService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const req = { user: { sub: 1 } };
      const result = await userController.findOne(1, req);
      expect(result).toEqual({ id: 1, name: 'Test User' });
      expect(userService.findOne).toHaveBeenCalledWith(1, 1);
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const userDto: CreateUserRequest = {
          name: 'Updated User', email: 'updated@example.com',
          password: ''
      };
      const result = await userController.update(1, userDto);
      expect(result).toEqual({ id: 1, name: 'Updated User' });
      expect(userService.update).toHaveBeenCalledWith(1, userDto);
    });
  });

  describe('remove', () => {
    it('should remove a user by id', async () => {
      await userController.remove(1);
      expect(userService.remove).toHaveBeenCalledWith(1);
    });
  });

  describe('checkEmail', () => {
    it('should check if email is already registered', async () => {
      await userController.checkEmail('test@example.com');
      expect(userService.checkEmail).toHaveBeenCalledWith('test@example.com');
    });
  });
});