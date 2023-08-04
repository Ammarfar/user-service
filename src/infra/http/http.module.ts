import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from './usecases-proxy/usecases.proxy.module';
import { UserController } from './controllers/user/user.controller';

@Module({
  imports: [UseCasesProxyModule.register()],
  controllers: [UserController],
})
export class HttpModule {}
