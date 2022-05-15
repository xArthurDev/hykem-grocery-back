import { IsNotEmpty } from 'class-validator';
import { Response } from 'express';

export class UserModel {
  id: string;

  @IsNotEmpty()
  username: string;

  password?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;
}

export class UpdateUserModel {
  id?: string;

  name?: string;

  password?: string;

  username?: string;

  email?: string;
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
