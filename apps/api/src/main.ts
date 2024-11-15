/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

//import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { PrettyHttpErrorDisplay } from './app/filters/pretty.http.error.display';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {bufferLogs: true});
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  // Enable nestJs for Error Formatting
  // app.useGlobalFilters(new FlubErrorHandler())
   app.useGlobalFilters(new PrettyHttpErrorDisplay(""))
  const logs = app.get(Logger);
  // Enable Pino logger globally
   app.useLogger(app.get(Logger))

  // For the automatic HTTP logs
  app.useGlobalInterceptors(new LoggerErrorInterceptor())

  logs.log(
    `🚀 ReviewShelf is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
