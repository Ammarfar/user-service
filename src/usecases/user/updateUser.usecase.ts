import { UserM } from 'src/domain/model/user';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from 'src/domain/repository/userRepository.interface';

export interface UpdateUserUseCaseRequest {
  name: string;
  balance: number;
}

export class UpdateUserUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: number, request: UpdateUserUseCaseRequest): Promise<void> {
    const user = new UserM();
    user.name = request.name;
    user.balance = request.balance;

    await this.userRepository.updateById(id, user);
    this.logger.log(
      'UpdateUserUseCase execute',
      `User ${id} have been updated`,
    );
  }
}
