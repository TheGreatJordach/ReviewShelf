import { BaseUserDto, IUser } from '@review-shelf-1.0.0/common';

export interface IUserAuthService {
  findUserByEmail(email: string): Promise<IUser | null>;
  createUserProfile(userDto:BaseUserDto): Promise<IUser | null>;
}
