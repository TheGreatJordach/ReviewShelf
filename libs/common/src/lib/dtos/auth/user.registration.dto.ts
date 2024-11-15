import { BaseUserDto } from '../users/base.user.dto';
import { IsStrongPassword } from 'class-validator';

export class UserRegistrationDto extends BaseUserDto{
  @IsStrongPassword()
  readonly password!:string;
}
