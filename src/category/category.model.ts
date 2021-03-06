import { IsNotEmpty } from 'class-validator';
import { Response } from 'express';
import { UserModel } from 'src/user/user.model';

export class CategoryModel {
  id: string;

  @IsNotEmpty()
  name: string;

  slug: string;

  user?: UserModel;

  isDefault?: boolean;

  @IsNotEmpty()
  userId: string;

  isDeleted?: boolean;
}

export class UpdateCategoryModel {
  id?: string;
  name?: string;
  slug?: string;
  userId?: string;
  isDefault?: boolean;
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
