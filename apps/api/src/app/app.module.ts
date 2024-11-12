import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from './db/db.config';
import { loadValidatedEnv } from './env/validate.env.variables';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true, envFilePath: '.env', validate:loadValidatedEnv}),
   TypeOrmModule.forRootAsync({
     imports:[ConfigModule],
     inject: [ConfigService],
     useFactory: getDatabaseConfig
   })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
