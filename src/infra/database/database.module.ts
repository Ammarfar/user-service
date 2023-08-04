import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/user.entity';
import { TypeOrmUserRepository } from './typeorm/repository/user.repository';
import { TypeOrmConfigModule } from './typeorm/config.module';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([User])],
  providers: [TypeOrmUserRepository],
  exports: [TypeOrmUserRepository],
})
export class DatabaseModule {}
