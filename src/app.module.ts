import { Module } from '@nestjs/common';
import { LoggerModule } from './infra/logger/logger.module';
import { ExceptionsModule } from './infra/exceptions/exceptions.module';
import { DatabaseModule } from './infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UseCasesProxyModule } from './infra/usecases-proxy/usecases.proxy.module';
import { HttpModule } from './infra/http/http.module';
import { MessagingModule } from './infra/messaging/messaging.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 15,
    }),
    LoggerModule,
    ExceptionsModule,
    DatabaseModule,
    UseCasesProxyModule.register(),
    HttpModule,
    MessagingModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
