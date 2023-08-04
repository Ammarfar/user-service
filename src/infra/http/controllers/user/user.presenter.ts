import { ApiProperty } from '@nestjs/swagger';
import { UserM } from 'src/domain/model/user';

export class UserPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  balance: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(user: UserM) {
    this.id = user.id;
    this.name = user.name;
    this.balance = user.balance;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
