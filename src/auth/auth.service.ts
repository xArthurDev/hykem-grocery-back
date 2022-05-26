/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserModel } from '../user/user.model';
import { UserService } from '../user/user.service';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthRequestModel } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserModel> {
    const user = await this.userService.getUserDetailsByEmail(email);
    const isPasswordMatch =
      (await bcrypt.compare(pass, user?.password || '')) || false;

    if (isPasswordMatch && user) {
      const { password, ...result } = user;
      if (user.isDeleted) {
        throw new HttpException(
          'User account is deleted',
          HttpStatus.FORBIDDEN,
        );
      }
      return result;
    } else {
      throw new HttpException(
        'Incorrect password or email',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async login(userData: AuthRequestModel): Promise<string> {
    const payload = { email: userData.email, sub: userData.email };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
}
