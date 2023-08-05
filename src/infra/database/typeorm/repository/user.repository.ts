import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from 'src/domain/repository/userRepository.interface';
import { User } from '../entities/user.entity';
import { UserM } from 'src/domain/model/user';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async insert(user: UserM): Promise<UserM> {
    const userEntity = UserMapper.toEntity(user);
    const result = await this.userEntityRepository.insert(userEntity);

    return UserMapper.toDomain(result.generatedMaps[0] as UserM);
  }

  async findAll(): Promise<UserM[]> {
    const usersEntity = await this.userEntityRepository.find();

    return usersEntity.map((user) => UserMapper.toDomain(user));
  }

  async findById(id: number): Promise<UserM> {
    const userEntity = await this.userEntityRepository.findOneByOrFail({
      id: id,
    });

    return UserMapper.toDomain(userEntity);
  }

  async deleteById(id: number): Promise<void> {
    await this.userEntityRepository.delete({ id: id });
  }

  async updateById(id: number, user: UserM): Promise<void> {
    await this.userEntityRepository.update({ id: id }, user);
  }

  async updateBalanceById(id: number, balance: number): Promise<void> {
    const userEntity = await this.userEntityRepository.findOneByOrFail({
      id: id,
    });
    userEntity.balance = balance;

    await this.userEntityRepository.save(userEntity);
  }
}
