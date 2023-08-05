import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '../usecases-proxy/usecases.proxy.module';
import { UserController } from './rabbitmq/controllers/user.controller';

@Module({
  imports: [UseCasesProxyModule.register()],
  controllers: [UserController],
})
export class MessagingModule {}
