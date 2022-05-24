/* eslint-disable prettier/prettier */
import { HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  IUserResponse,
  IUsersResponse,
  UpdateUserModel,
  UserModel,
} from './user.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import Utils from 'src/utils/utils';
import { TokenGuard } from 'src/token/token.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @UseGuards(TokenGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  async index(@Res() response: IUsersResponse): Promise<IUsersResponse> {
    try {
      const users = await this.userService.getAllUsers();
      return response.status(HttpStatus.OK).json({
        status: 'success',
        users,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'getAllUsers'),
      });
    }
  }

  @Post('create')
  async createUser(
    @Body() userData: UserModel,
    @Res() response: IUserResponse,
  ): Promise<IUserResponse> {
    const foundedAccount = await this.userService.getUserDetailsByEmail(
      userData.email,
    );
    if (foundedAccount) {
      return response.status(HttpStatus.FORBIDDEN).json({
        status: 'error',
        message: 'There is already a registered user with this email',
      });
    }
    try {
      const createdUser = await this.userService.createUser(userData);
      return response.status(HttpStatus.OK).json({
        status: 'success',
        user: createdUser,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'createUser'),
      });
    }
  }

  @UseGuards(TokenGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserDetails(
    @Param('id') id: string,
    @Res() response: IUserResponse,
  ): Promise<IUserResponse> {
    try {
      const foundedUser = await this.userService.getUserDetails(id);
      return response.status(HttpStatus.OK).json({
        status: 'success',
        user: foundedUser,
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'getUserDetails'),
      });
    }
  }

  @UseGuards(TokenGuard)
  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: UpdateUserModel,
    @Res() response: IUserResponse,
  ): Promise<IUserResponse> {
    try {
      const updatedUser = await this.userService.updateUser(userData, id);
      return response.status(HttpStatus.OK).json({
        status: 'success',
        user: updatedUser,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'updateUser'),
      });
    }
  }

  @UseGuards(TokenGuard)
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async deleteUser(
    @Param('id') id: string,
    @Res() response: IUserResponse,
  ): Promise<IUserResponse> {
    try {
      await this.userService.deleteUser(id);
      return response.status(HttpStatus.OK).json({
        status: 'success',
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'deleteUser'),
      });
    }
  }
}
