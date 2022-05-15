import { Response } from 'express';

export class JwtPayload {
  sub: string | { [key: string]: any };
  iat: string | { [key: string]: any };
  exp: string | { [key: string]: any };
}

class TokenData {
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

interface TokenModelResponse {
  tokenData?: TokenData;
}

export interface ITokenResponse extends Response {
  body?: TokenModelResponse;
}
