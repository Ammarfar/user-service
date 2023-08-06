import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '../usecases-proxy/usecases.proxy.module';
import { UserController } from './controllers/user/user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    UseCasesProxyModule.register(),
    CacheModule.register(),
    ClientsModule.register([
      {
        name: 'TRX_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'trx_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class HttpModule {}
