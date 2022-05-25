import { ProductService } from './../product/product.service';
import { CategoryService } from './category.service';
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
  ICategoriesResponse,
  CategoryModel,
  ICategoryResponse,
  UpdateCategoryModel,
} from './category.model';

@UseGuards(TokenGuard)
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
  ) {}

  @Get(':userId')
  async getCategoryByUserId(
    @Param('userId') userId: string,
    @Res() response: ICategoriesResponse,
  ): Promise<ICategoriesResponse> {
    try {
      const categories = await this.categoryService.getAllCategories(userId);
      return response.status(HttpStatus.OK).json({
        status: 'success',
        categories,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'getAllCategories'),
      });
    }
  }

  @Post('create')
  async createCategory(
    @Body() categoryData: CategoryModel,
    @Res() response: ICategoryResponse,
  ): Promise<ICategoryResponse> {
    const foundedCategoryBySlug = await this.categoryService.getCategoryBySlug(
      categoryData.name,
    );

    if (foundedCategoryBySlug) {
      return response.status(HttpStatus.FORBIDDEN).json({
        status: 'error',
        message: 'There is already a registered category with this slug',
      });
    }
    try {
      const createdCategory = await this.categoryService.createCategory(
        categoryData,
        categoryData.userId,
      );
      return response.status(HttpStatus.OK).json({
        status: 'success',
        category: createdCategory,
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'createCategory'),
      });
    }
  }

  @Get(':userId/:id')
  async getCategoryDetailsById(
    @Param('id') id: string,
    @Res() response: ICategoryResponse,
  ): Promise<ICategoryResponse> {
    try {
      const foundedCategory = await this.categoryService.getCategoryById(id);
      return response.status(HttpStatus.OK).json({
        status: 'success',
        category: foundedCategory,
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'getCategoryById'),
      });
    }
  }

  @Put('update/:userId/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() categoryData: UpdateCategoryModel,
    @Res() response: ICategoryResponse,
  ): Promise<ICategoryResponse> {
    try {
      const updatedCategory = await this.categoryService.updateCategory(
        categoryData,
        id,
      );
      return response.status(HttpStatus.OK).json({
        status: 'success',
        category: updatedCategory,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'updateCategory'),
      });
    }
  }

  @Delete('delete/:userId/:id')
  async deleteCategory(
    @Param('id') id: string,
    @Res() response: ICategoryResponse,
  ): Promise<ICategoryResponse> {
    try {
      const categoryRelatedProduct =
        await this.productService.getFirstProductByCategoryId(id);

      if (categoryRelatedProduct) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          status: 'error',
          message:
            'You can not delete this category because it has related products',
        });
      }

      await this.categoryService.deleteCategory(id);
      return response.status(HttpStatus.OK).json({
        status: 'success',
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: Utils.errorHandlerMessage(error.code, 'deleteCategory'),
      });
    }
  }
}
