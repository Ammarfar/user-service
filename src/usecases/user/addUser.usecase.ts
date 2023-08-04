import { UserM } from 'src/domain/model/user';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from 'src/domain/repository/userRepository.interface';

export interface addUserUseCaseRequest {
  name: string;
}

export class AddUserUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(request: addUserUseCaseRequest): Promise<UserM> {
    const user = new UserM();
    user.name = request.name;

    const result = await this.userRepository.insert(user);
    this.logger.log('AddUserUseCase execute', 'New user have been Added');

    return result;
  }
}
