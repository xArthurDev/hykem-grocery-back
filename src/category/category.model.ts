import { IsNotEmpty } from 'class-validator';
import { Response } from 'express';

export class CategoryModel {
  id: string;

  @IsNotEmpty()
  name: string;

  slug: string;
}

export class UpdateCategoryModel {
  id?: string;
  name?: string;
  slug?: string;
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
