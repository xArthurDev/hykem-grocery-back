import { Response } from 'express';

export class AuthRequestModel {
  email: string;
  password: string;
}

interface AuthModel {
  accessToken: string;
}

export interface IAuthResponse extends Response {
  body: AuthModel;
}
