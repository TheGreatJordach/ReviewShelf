import { AuthAbstractService } from './auth.abstract.service';
import { BaseUserDto, IUser } from '@review-shelf-1.0.0/common';
import { PasswordImplService } from './password/password.impl.service';
import { PinoLogger } from 'nestjs-pino';
import { Inject, Injectable } from '@nestjs/common';
import { IUserAuthService } from './interfaces/user.service.interface';

@Injectable()
export class AuthImplService extends AuthAbstractService{

  constructor(passwordService:PasswordImplService,
              private logging: PinoLogger,
              @Inject("IUserServiceAuthOperations")
              private readonly userService: IUserAuthService) {
    super(passwordService);
  }

  registerUser(registerUser: BaseUserDto): Promise<string> {
    this.logging.info(JSON.stringify(registerUser));
    return Promise.resolve('');
  }


  authenticateUser(loginDto: BaseUserDto): Promise<string> {
    this.logging.info(JSON.stringify(loginDto));
    return Promise.resolve('');
  }

  logoutUser(loginDto: BaseUserDto): Promise<string> {
    this.logging.info(JSON.stringify(loginDto));
    return Promise.resolve('');
  }

  override forgotPassword(loginDto: BaseUserDto): Promise<IUser> {
    this.logging.info(JSON.stringify(loginDto));
    return Promise.resolve({id:12,name:"john",userName:"joe"} as IUser);
  }



}
