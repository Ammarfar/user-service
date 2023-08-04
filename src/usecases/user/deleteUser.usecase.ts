import { ILogger } from 'src/domain/logger/logger.interface';
import { UserRepository } from 'src/domain/repository/userRepository.interface';

export class deleteUserUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.userRepository.deleteById(id);
    this.logger.log(
      'deleteUserUseCase execute',
      `User ${id} have been deleted`,
    );
  }
}
