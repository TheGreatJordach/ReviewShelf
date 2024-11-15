import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '@review-shelf-1.0.0/common';

@Injectable()
export class UsersService {


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
}
