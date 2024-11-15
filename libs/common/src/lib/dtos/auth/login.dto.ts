import { OmitType } from '@nestjs/mapped-types';
import { UserRegistrationDto } from './user.registration.dto';

export class LoginDto extends OmitType(UserRegistrationDto,["name","userName"]){}
