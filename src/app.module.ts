import { Module } from '@nestjs/common';
import { LoggerModule } from './infra/logger/logger.module';
import { ExceptionsModule } from './infra/exceptions/exceptions.module';
import { DatabaseModule } from './infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UseCasesProxyModule } from './infra/http/usecases-proxy/usecases.proxy.module';
import { HttpModule } from './infra/http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    ExceptionsModule,
    DatabaseModule,
    UseCasesProxyModule.register(),
    HttpModule,
  ],
})
export class AppModule {}
