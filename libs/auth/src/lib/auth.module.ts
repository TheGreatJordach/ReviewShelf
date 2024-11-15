import { Module } from '@nestjs/common';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [PasswordModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AuthModule {}
