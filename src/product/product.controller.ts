import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TokenGuard } from 'src/token/token.guard';
import Utils from 'src/utils/utils';
import { IFilterProductsRequest, IProductsResponse } from './product.model';
import { ProductService } from './product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(TokenGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  async index(@Res() response: IProductsResponse): Promise<IProductsResponse> {
    try {
      const products = await this.productService.getAllProducts();
      return response.status(HttpStatus.OK).json({
        status: 'success',
        products,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'getAllProducts'),
      });
    }
  }

  @UseGuards(TokenGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':categoryName')
  async getFilteredProducts(
    @Res() response: IProductsResponse,
    @Body() requestData: IFilterProductsRequest,
  ): Promise<IProductsResponse> {
    try {
      const products = await this.productService.getFilteredProducts(
        requestData.body.categoryName,
      );
      return response.status(HttpStatus.OK).json({
        status: 'success',
        products,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'getFilteredProducts'),
      });
    }
  }
}
