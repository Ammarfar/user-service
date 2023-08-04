import { UserM } from 'src/domain/model/user';
import { UserRepository } from 'src/domain/repository/userRepository.interface';

export class GetUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<UserM> {
    return await this.userRepository.findById(id);
  }
}
