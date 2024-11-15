import { IUser } from '../../interfaces/user.interface';
import { Expose } from 'class-transformer';

export class PublicUserDto implements IUser{
  @Expose()
  readonly id!: number;
  @Expose()
  readonly name!: string;
  @Expose()
  readonly userName!: string;
  @Expose()
  readonly email!: string;
}
