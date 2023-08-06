import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './infra/common/filter/exception.filter';
import { LoggerService } from './infra/logger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { LoggingInterceptor } from './infra/common/interceptors/logger.interceptor';
import { ResponseInterceptor } from './infra/common/interceptors/response.interceptor';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  app.use(helmet());

  app.use(cookieParser());

  // Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  // interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  // base routing
  app.setGlobalPrefix('v1');

  // swagger config
  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Clean Architecture & Microservices Event Pattern Nestjs')
      .setDescription('User Service')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api', app, document);
  }

  // microservice
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: process.env.RMQ_URL,
      queue: process.env.RMQ_QUEUE,
      queueOptions: { durable: false },
      prefetchCount: 1,
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.APP_PORT);
}
bootstrap();
