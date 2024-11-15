import { Injectable } from '@nestjs/common';
import { BaseUserDto, IUser, UpdateUserDto } from '@review-shelf-1.0.0/common';
import { IUserAuthService } from '@review-shelf-1.0.0/auth';

@Injectable()
export class UsersService implements IUserAuthService{


  getProfile(id:number) {
    return `This Service Retrieve user profile information with id ${id}`
  }

  updateProfile(id:number,userInfo:UpdateUserDto) {
    return `This Service update the info : ${JSON.stringify(userInfo)}
    from profile information with id ${id}`
  }

  deleteProfile(id:number) {
    return `This Service delete the user profile information with id ${id}`
  }

  createUser(userDto: BaseUserDto): Promise<IUser | null> {
    return Promise.resolve(null);
  }

  findUserByEmail(email: string): Promise<IUser | null> {
    return Promise.resolve(null);
  }
}
