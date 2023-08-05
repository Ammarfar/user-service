import { DynamicModule, Module } from '@nestjs/common';
import { GetUserUseCase } from 'src/usecases/user/getUser.usecase';
import { GetUsersUseCase } from 'src/usecases/user/getUsers.usecase';
import { AddUserUseCase } from 'src/usecases/user/addUser.usecase';
import { UpdateUserUseCase } from 'src/usecases/user/updateUser.usecase';
import { deleteUserUseCase } from 'src/usecases/user/deleteUser.usecase';
import { UpdateUserBalanceUseCase } from 'src/usecases/user/updateUserBalance.usecase';

import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

import { DatabaseModule } from 'src/infra/database/database.module';
import { TypeOrmUserRepository } from '../database/typeorm/repository/user.repository';

import { UseCaseProxy } from './usecases.proxy';

@Module({
  imports: [LoggerModule, DatabaseModule],
})
export class UseCasesProxyModule {
  static GET_USER_USECASES_PROXY = 'getUserUseCasesProxy';
  static GET_USERS_USECASES_PROXY = 'getUsersUseCasesProxy';
  static POST_USER_USECASES_PROXY = 'postUserUseCasesProxy';
  static DELETE_USER_USECASES_PROXY = 'deleteUserUseCasesProxy';
  static PUT_USER_USECASES_PROXY = 'putUserUseCasesProxy';
  static UPDATE_USER_BALANCE_USECASES_PROXY = 'updateUserBalanceUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [TypeOrmUserRepository],
          provide: UseCasesProxyModule.GET_USER_USECASES_PROXY,
          useFactory: (userRepository: TypeOrmUserRepository) =>
            new UseCaseProxy(new GetUserUseCase(userRepository)),
        },
        {
          inject: [TypeOrmUserRepository],
          provide: UseCasesProxyModule.GET_USERS_USECASES_PROXY,
          useFactory: (userRepository: TypeOrmUserRepository) =>
            new UseCaseProxy(new GetUsersUseCase(userRepository)),
        },
        {
          inject: [LoggerService, TypeOrmUserRepository],
          provide: UseCasesProxyModule.POST_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: TypeOrmUserRepository,
          ) => new UseCaseProxy(new AddUserUseCase(logger, userRepository)),
        },
        {
          inject: [LoggerService, TypeOrmUserRepository],
          provide: UseCasesProxyModule.PUT_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: TypeOrmUserRepository,
          ) => new UseCaseProxy(new UpdateUserUseCase(logger, userRepository)),
        },
        {
          inject: [LoggerService, TypeOrmUserRepository],
          provide: UseCasesProxyModule.DELETE_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: TypeOrmUserRepository,
          ) => new UseCaseProxy(new deleteUserUseCase(logger, userRepository)),
        },
        {
          inject: [LoggerService, TypeOrmUserRepository],
          provide: UseCasesProxyModule.UPDATE_USER_BALANCE_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            userRepository: TypeOrmUserRepository,
          ) =>
            new UseCaseProxy(
              new UpdateUserBalanceUseCase(logger, userRepository),
            ),
        },
      ],
      exports: [
        UseCasesProxyModule.GET_USER_USECASES_PROXY,
        UseCasesProxyModule.GET_USERS_USECASES_PROXY,
        UseCasesProxyModule.POST_USER_USECASES_PROXY,
        UseCasesProxyModule.PUT_USER_USECASES_PROXY,
        UseCasesProxyModule.DELETE_USER_USECASES_PROXY,
        UseCasesProxyModule.UPDATE_USER_BALANCE_USECASES_PROXY,
      ],
    };
  }
}
