import { IUser } from '@review-shelf-1.0.0/common';

export interface IUserFeatures {
  getUserProfile(id:number): Promise<IUser>;
  updateUserProfile(id:number,userInfo:IUser): Promise<IUser>
  deleteUserProfile(id:number): Promise<void>
}
