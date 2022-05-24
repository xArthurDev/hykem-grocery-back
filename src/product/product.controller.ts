import { CategoryService } from './../category/category.service';
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
  IProductResponse,
  IProductsResponse,
  ProductModel,
  UpdateProductModel,
} from './product.model';
import { ProductService } from './product.service';

@UseGuards(TokenGuard)
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  @Get()
  async index(@Res() response: IProductsResponse): Promise<IProductsResponse> {
    try {
      const products = await this.productService.getAllProducts();
      return response.status(HttpStatus.OK).json({
        status: 'success',
        products,
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'getAllProducts'),
      });
    }
  }

  @Get('slug/:categorySlug')
  async getProductsByCategorySlug(
    @Res() response: IProductsResponse,
    @Param('categorySlug') categorySlug: string,
  ): Promise<IProductsResponse> {
    try {
      const products = await this.productService.getProductsByCategorySlug(
        categorySlug,
      );
      return response.status(HttpStatus.OK).json({
        status: 'success',
        products,
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'getFilteredProducts'),
      });
    }
  }

  @Post('create')
  async createProduct(
    @Body() productData: ProductModel,
    @Res() response: IProductResponse,
  ): Promise<IProductResponse> {
    try {
      const foundedCategory = await this.categoryService.getCategoryById(
        productData.categoryId,
      );
      if (!foundedCategory) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          status: 'error',
          message: 'Category not found, product must have a category',
        });
      }
      delete productData.categoryId;
      const createdProduct = await this.productService.createProduct(
        productData,
        foundedCategory.id,
      );
      return response.status(HttpStatus.OK).json({
        status: 'success',
        product: createdProduct,
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'createProduct'),
      });
    }
  }

  @Get(':id')
  async getProductDetailsById(
    @Param('id') id: string,
    @Res() response: IProductResponse,
  ): Promise<IProductResponse> {
    try {
      const foundedProduct = await this.productService.getProductById(id);
      return response.status(HttpStatus.OK).json({
        status: 'success',
        product: foundedProduct,
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'getProductDetails'),
      });
    }
  }

  @Put('update/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productData: UpdateProductModel,
    @Res() response: IProductResponse,
  ): Promise<IProductResponse> {
    try {
      const updatedProduct = await this.productService.updateProduct(
        productData,
        id,
      );
      return response.status(HttpStatus.OK).json({
        status: 'success',
        product: updatedProduct,
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'updateProduct'),
      });
    }
  }

  @Delete('delete/:id')
  async deleteProduct(
    @Param('id') id: string,
    @Res() response: IProductResponse,
  ): Promise<IProductResponse> {
    try {
      await this.productService.deleteProduct(id);
      return response.status(HttpStatus.OK).json({
        status: 'success',
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'deleteProduct'),
      });
    }
  }
}
