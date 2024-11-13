import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './db/db.config';
import { loadValidatedEnv } from './env/validate.env.variables';
import { LoggingModule } from '@review-shelf-1.0.0/logging';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true, envFilePath: '.env', validate:loadValidatedEnv}),
   TypeOrmModule.forRootAsync({
     imports:[ConfigModule],
     inject: [ConfigService],
     useFactory: getDatabaseConfig
   }),LoggingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
