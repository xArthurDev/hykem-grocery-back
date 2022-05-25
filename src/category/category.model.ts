import { IsNotEmpty } from 'class-validator';
import { Response } from 'express';
import { UserModel } from 'src/user/user.model';

export class CategoryModel {
  id: string;

  @IsNotEmpty()
  name: string;

  slug: string;

  user?: UserModel;

  @IsNotEmpty()
  isDefault: boolean;

  @IsNotEmpty()
  userId: string;
}

export class UpdateCategoryModel {
  id?: string;
  name?: string;
  slug?: string;
  userId?: string;
}

interface CategoriesModelResponse {
  categories?: CategoryModel[];
}

export interface ICategoriesResponse extends Response {
  body: CategoriesModelResponse;
}

interface CategoryModelResponse {
  category?: CategoryModel;
}

export interface ICategoryResponse extends Response {
  body: CategoryModelResponse;
}
