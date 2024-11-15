import { OmitType } from '@nestjs/mapped-types';
import { RegistrationDto } from './registrationDto';

export class LoginDto extends OmitType(RegistrationDto,["name","userName"]){}
