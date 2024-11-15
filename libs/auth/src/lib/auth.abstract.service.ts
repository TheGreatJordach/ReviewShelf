import { Injectable } from '@nestjs/common';
import { PasswordAbstractService } from './password/password.abstract.service';
import { BaseUserDto } from '@review-shelf-1.0.0/common';
import { IUser } from '@review-shelf-1.0.0/common';
@Injectable()
export abstract class AuthAbstractService{

  protected constructor(
    private readonly passwordService: PasswordAbstractService) {}


  abstract registerUser(registerUser: BaseUserDto): Promise<string>

  abstract authenticateUser(loginDto:BaseUserDto): Promise<string>

  abstract logoutUser(loginDto:BaseUserDto) : Promise<string>

  abstract forgotPassword(loginDto:BaseUserDto): Promise<IUser>

}
