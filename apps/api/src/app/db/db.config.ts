import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = async (configService:ConfigService): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.getOrThrow<string>("DATASOURCE_HOST"),
  port: configService.getOrThrow<number>("DATASOURCE_PORT"),
  username: configService.getOrThrow<string>("DATASOURCE_USERNAME"),
  password: configService.getOrThrow<string>("DATASOURCE_PASSWORD"),
  database: configService.getOrThrow<string>("DATASOURCE_DATABASE"),
  entities: [],
  synchronize: true // TODO only for dev
})
