import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UseCasesProxyModule } from '../../usecases-proxy/usecases.proxy.module';
import { UseCaseProxy } from '../../usecases-proxy/usecases.proxy';
import { GetUserUseCase } from 'src/usecases/user/getUser.usecase';
import { GetUsersUseCase } from 'src/usecases/user/getUsers.usecase';
import { UpdateUserUseCase } from 'src/usecases/user/updateUser.usecase';
import { deleteUserUseCase } from 'src/usecases/user/deleteUser.usecase';
import { AddUserUseCase } from 'src/usecases/user/addUser.usecase';

import { UserPresenter } from './user.presenter';
import { AddUserDto, UpdateUserDto } from './user.dto';

@Controller()
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    @Inject(UseCasesProxyModule.GET_USER_USECASES_PROXY)
    private readonly getUserUsecaseProxy: UseCaseProxy<GetUserUseCase>,
    @Inject(UseCasesProxyModule.GET_USERS_USECASES_PROXY)
    private readonly getAllUserUsecaseProxy: UseCaseProxy<GetUsersUseCase>,
    @Inject(UseCasesProxyModule.PUT_USER_USECASES_PROXY)
    private readonly updateUserUsecaseProxy: UseCaseProxy<UpdateUserUseCase>,
    @Inject(UseCasesProxyModule.DELETE_USER_USECASES_PROXY)
    private readonly deleteUserUsecaseProxy: UseCaseProxy<deleteUserUseCase>,
    @Inject(UseCasesProxyModule.POST_USER_USECASES_PROXY)
    private readonly addUserUsecaseProxy: UseCaseProxy<AddUserUseCase>,
  ) {}

  @Get('user/:id')
  async getUser(@Param() params: any) {
    const user = await this.getUserUsecaseProxy
      .getInstance()
      .execute(params.id);

    return new UserPresenter(user);
  }

  @Get('users')
  async getUsers() {
    const users = await this.getAllUserUsecaseProxy.getInstance().execute();

    return users.map((user) => new UserPresenter(user));
  }

  @Put('user/:id')
  async updateUser(@Param() params: any, @Body() updateUserDto: UpdateUserDto) {
    await this.updateUserUsecaseProxy
      .getInstance()
      .execute(params.id, updateUserDto);

    return 'success';
  }

  @Delete('user/:id')
  async deleteUser(@Param() params: any) {
    await this.deleteUserUsecaseProxy.getInstance().execute(params.id);

    return 'success';
  }

  @Post('user')
  async addUser(@Body() addUserDto: AddUserDto) {
    const userCreated = await this.addUserUsecaseProxy
      .getInstance()
      .execute(addUserDto);
    return new UserPresenter(userCreated);
  }
}
