import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '../usecases-proxy/usecases.proxy.module';
import { UserController } from './controllers/user/user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    UseCasesProxyModule.register(),
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
})
export class HttpModule {}
