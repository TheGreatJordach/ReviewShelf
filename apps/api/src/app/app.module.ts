import { Module, ValidationPipe } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './db/db.config';
import { loadValidatedEnv } from './env/validate.env.variables';
import { LoggingModule } from '@review-shelf-1.0.0/logging';
import { APP_PIPE } from '@nestjs/core';
import { UsersModule, UsersService } from '@review-shelf-1.0.0/users';
import { AuthModule } from '@review-shelf-1.0.0/auth';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true, envFilePath: '.env', validate:loadValidatedEnv}),
   TypeOrmModule.forRootAsync({
     imports:[ConfigModule],
     inject: [ConfigService],
     useFactory: getDatabaseConfig
   }),
    LoggingModule,
    UsersModule,
    AuthModule,],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_PIPE,
    useValue : new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform:true,
      transformOptions:{
        enableImplicitConversion:true,
      }
    })
  },
    {provide: "IUserServiceAuthOperations", useClass: UsersService}],
})
export class AppModule {}
