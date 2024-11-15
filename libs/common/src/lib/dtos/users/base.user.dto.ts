import { IUser } from '../../interfaces/user.interface';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class BaseUserDto implements IUser{
  @IsNotEmpty()
  @IsEmail()
  readonly email!: string;
  @IsNotEmpty()
  @IsString()
  readonly name!: string;
  @IsNotEmpty()
  @IsString()
  readonly userName!: string;
}
