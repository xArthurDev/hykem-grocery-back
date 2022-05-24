import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TokenGuard } from 'src/token/token.guard';
import Utils from 'src/utils/utils';
import {
  IShoplistResponse,
  IShoplistsResponse,
  ShoplistModel,
  UpdateShoplistModel,
} from './shoplist.model';
import { ShoplistService } from './shoplist.service';

@UseGuards(TokenGuard)
@UseGuards(JwtAuthGuard)
@Controller('shoplists')
export class ShoplistController {
  constructor(private shoplistService: ShoplistService) {}

  @Get(':userId')
  async getShoplistsByUserId(
    @Res() response: IShoplistsResponse,
    @Param('userId') userId: string,
  ): Promise<IShoplistsResponse> {
    try {
      const shoplists = await this.shoplistService.getShoplistsByUserId(userId);
      return response.status(HttpStatus.OK).json({
        status: 'success',
        shoplists,
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'getShoplistsByUserId'),
      });
    }
  }

  @Post('create')
  async createShoplist(
    @Body() shoplistData: ShoplistModel,
    @Res() response: IShoplistResponse,
  ): Promise<IShoplistResponse> {
    try {
      const createdShoplist = await this.shoplistService.createShoplist(
        shoplistData,
        shoplistData.userId,
      );
      return response.status(HttpStatus.OK).json({
        status: 'success',
        shoplist: createdShoplist,
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'createShoplist'),
      });
    }
  }

  @Get(':userId/:id')
  async getShoplistDetailsById(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Res() response: IShoplistResponse,
  ): Promise<IShoplistResponse> {
    try {
      const foundedShoplist = await this.shoplistService.getShoplistById(
        userId,
        id,
      );
      return response.status(HttpStatus.OK).json({
        status: 'success',
        shoplist: foundedShoplist,
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(
          error.code,
          'getShoplistDetailsById',
        ),
      });
    }
  }

  @Put('update/:userId/:id')
  async updateShoplist(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() shoplistData: UpdateShoplistModel,
    @Res() response: IShoplistResponse,
  ): Promise<IShoplistResponse> {
    try {
      const updatedShoplist = await this.shoplistService.updateShoplist(
        shoplistData,
        userId,
        id,
      );
      return response.status(HttpStatus.OK).json({
        status: 'success',
        shoplist: updatedShoplist,
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'updateShoplist'),
      });
    }
  }

  @Delete('delete/:userId/:id')
  async deleteShoplist(
    @Param('id') id: string,
    @Res() response: IShoplistResponse,
  ): Promise<IShoplistResponse> {
    try {
      await this.shoplistService.deleteShoplist(id);
      return response.status(HttpStatus.OK).json({
        status: 'success',
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'deleteShoplist'),
      });
    }
  }
}
