import { Controller, Inject } from '@nestjs/common';

import { EventPattern, Payload } from '@nestjs/microservices';

import { UseCasesProxyModule } from 'src/infra/usecases-proxy/usecases.proxy.module';
import { UseCaseProxy } from 'src/infra/usecases-proxy/usecases.proxy';
import { UpdateUserBalanceUseCase } from 'src/usecases/user/updateUserBalance.usecase';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UseCasesProxyModule.UPDATE_USER_BALANCE_USECASES_PROXY)
    private readonly updateUserBalanceUsecaseProxy: UseCaseProxy<UpdateUserBalanceUseCase>,
  ) {}

  @EventPattern('trx.created')
  async handleTransactionCreatedEvent(@Payload() payload) {
    const { userId, totalPrice } = payload;

    await this.updateUserBalanceUsecaseProxy
      .getInstance()
      .execute(userId, totalPrice);
  }
}
