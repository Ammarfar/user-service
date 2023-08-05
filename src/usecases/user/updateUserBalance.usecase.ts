import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from 'src/domain/repository/userRepository.interface';

export class UpdateUserBalanceUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: number, balance: number): Promise<void> {
    await this.userRepository.updateBalanceById(id, balance);
    this.logger.log(
      'UpdateUserBalanceUseCase execute',
      `User ${id} balance have been updated`,
    );
  }
}
