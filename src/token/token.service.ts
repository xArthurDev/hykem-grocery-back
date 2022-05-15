import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './token.model';
import prisma from 'prisma/prisma-instance';
import { response } from 'express';

@Injectable()
export class TokenService {
  tokensRepository = prisma.tokens;
  constructor(private readonly jwtService: JwtService) {}

  async saveToken(token: string, email: string): Promise<any> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore to avoid type warning
      const decodedJwtAccessToken: JwtPayload = this.jwtService.decode(token);

      const expiresAt = new Date(Number(decodedJwtAccessToken.exp) * 1000);
      const createdAt = new Date(Number(decodedJwtAccessToken.iat) * 1000);

      // INFO: Fix UTC timezone for GMT-0300
      createdAt.setHours(createdAt.getHours() - 3);
      expiresAt.setHours(expiresAt.getHours() - 3);

      const newToken = {
        token,
        email,
        createdAt,
        expiresAt,
      };

      return await this.tokensRepository.create({
        data: { ...newToken },
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: 'Ocurred an error on trying to save token',
      });
    }
  }

  async validateToken(accessToken: string): Promise<boolean> {
    try {
      const parsedToken = accessToken.replace('Bearer ', '');
      const foundedToken = await this.tokensRepository.findFirst({
        where: { token: parsedToken },
      });

      if (!foundedToken) {
        throw new UnauthorizedException('Invalid Token');
      }
      return foundedToken !== null ? true : false;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid Token');
    }
  }

  async verifyTokenByEmail(email: string): Promise<any> {
    try {
      return await this.tokensRepository.findFirst({
        where: { email },
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: 'Ocurred an error on trying to verify token',
      });
    }
  }

  async deleteToken(token: string): Promise<any> {
    try {
      const parsedToken = token.replace('Bearer ', '');
      return await this.tokensRepository.delete({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore to avoid type warning
        where: { token: parsedToken },
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: 'Ocurred an error on trying to delete token',
      });
    }
  }
}
