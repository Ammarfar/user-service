import { UserM } from '../model/user';

export interface UserRepository {
  insert(user: UserM): Promise<UserM>;
  findAll(): Promise<UserM[]>;
  findById(id: number): Promise<UserM>;
  updateById(id: number, user: UserM): Promise<void>;
  deleteById(id: number): Promise<void>;
  updateBalanceById(id: number, balance: number): Promise<void>;
}
