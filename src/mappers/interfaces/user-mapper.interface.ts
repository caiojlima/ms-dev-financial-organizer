import { CreateUserResponse } from 'src/controllers/dtos/create-user-response.dto';
import { User } from 'src/models/user.entity';
import { IMapper } from './mapper.interface';

export abstract class IUserMapper implements IMapper<User, CreateUserResponse> {
  abstract fromEntity(entity: User): CreateUserResponse;
}
