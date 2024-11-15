import { Module } from '@nestjs/common';
import { BcryptImplService } from './hash/bcrypt.impl.service';
import { PasswordImplService } from './password.impl.service';

@Module({
  providers: [BcryptImplService,PasswordImplService],
  exports:[PasswordImplService]
})
export class PasswordModule {}
