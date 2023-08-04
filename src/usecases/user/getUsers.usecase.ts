import { UserM } from 'src/domain/model/user';
import { UserRepository } from 'src/domain/repository/userRepository.interface';

export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserM[]> {
    return await this.userRepository.findAll();
  }
}
