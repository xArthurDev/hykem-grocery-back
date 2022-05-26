import { CategoryModel } from './../category/category.model';
import { Response } from 'express';
import { IsNotEmpty } from 'class-validator';
import { UserModel } from 'src/user/user.model';

export class ProductModel {
  id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  minPrice: number;

  @IsNotEmpty()
  maxPrice: number;

  @IsNotEmpty()
  weight: string;

  @IsNotEmpty()
  imageUrl: string;

  category?: CategoryModel;

  @IsNotEmpty()
  categoryId: string;

  user?: UserModel;

  @IsNotEmpty()
  isDefault: boolean;

  @IsNotEmpty()
  userId: string;

  isDeleted?: boolean;
}

export class GetProductModel {
  id: string;
}

export class UpdateProductModel {
  id?: string;
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  weight?: string;
  imageUrl?: string;
  categoryId?: string;
  user?: UserModel;
  isDefault?: boolean;
  userId?: string;
  isDeleted?: boolean;
}

interface ProductModelResponse {
  product?: ProductModel;
}

export interface IProductResponse extends Response {
  body: ProductModelResponse;
}

interface ProductsModelResponse {
  products?: ProductModel[];
}

export interface IProductsResponse extends Response {
  body: ProductsModelResponse;
}
