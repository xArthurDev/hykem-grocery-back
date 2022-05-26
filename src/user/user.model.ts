import { IsNotEmpty } from 'class-validator';
import { Response } from 'express';

export const Role = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  PREMIUM: 'PREMIUM',
};

export class UserModel {
  id: string;

  @IsNotEmpty()
  username: string;

  password?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  isDeleted?: boolean;

  role?: 'ADMIN' | 'USER' | 'PREMIUM';
}

export class UpdateUserModel {
  id?: string;

  name?: string;

  password?: string;

  username?: string;

  email?: string;

  isDeleted?: boolean;

  role?: 'ADMIN' | 'USER' | 'PREMIUM';
}

interface UserModelResponse {
  user?: UserModel;
}

export interface IUserResponse extends Response {
  body: UserModelResponse;
}

interface UsersModelResponse {
  users: UserModel[];
}

export interface IUsersResponse extends Response {
  body: UsersModelResponse;
}
