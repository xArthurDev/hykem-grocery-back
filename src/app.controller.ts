import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import {
  Controller,
  UseGuards,
  Post,
  Res,
  HttpStatus,
  Body,
  Req,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthRequestModel, IAuthResponse } from './auth/auth.model';
import { TokenService } from './token/token.service';
import { TokenGuard } from './token/token.guard';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private tokenService: TokenService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Body() authData: AuthRequestModel,
    @Res() response: IAuthResponse,
  ): Promise<IAuthResponse> {
    try {
      const foundedToken = await this.tokenService.verifyTokenByEmail(
        authData.email,
      );
      if (foundedToken) {
        await this.tokenService.deleteToken(foundedToken.token);
      }
      const accessToken = await this.authService.login(authData);
      this.tokenService.saveToken(accessToken, authData.email);

      return response.status(HttpStatus.OK).json({
        status: 'success',
        accessToken,
      });
    } catch {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: 'Ocurred an error on trying to login',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(TokenGuard)
  @Post('auth/logout')
  async logout(
    @Req() request: any,
    @Res() response: any,
  ): Promise<IAuthResponse> {
    try {
      const requestResponse = await this.tokenService.deleteToken(
        request.headers.authorization,
      );

      console.log('request response', requestResponse);
      return response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Logout successfully',
      });
    } catch {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: 'Ocurred an error on trying to logout',
      });
    }
  }
}
