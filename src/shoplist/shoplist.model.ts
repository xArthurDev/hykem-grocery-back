import { UserModel } from './../user/user.model';
import { IsNotEmpty } from 'class-validator';
import { ProductModel } from './../product/product.model';
import { Response } from 'express';

export class ShoplistModel {
  id: string;

  @IsNotEmpty()
  name: string;

  description?: string;

  products?: ProductModel[];

  user?: UserModel;

  @IsNotEmpty()
  userId: string;

  isDeleted?: boolean;
}

export class UpdateShoplistModel {
  id?: string;
  name?: string;
  description?: string;
  products?: ProductModel[];
  userId?: string;
  isDeleted?: boolean;
}

interface ShoplistModelResponse {
  shoplist?: ShoplistModel;
}

export interface IShoplistResponse extends Response {
  body: ShoplistModelResponse;
}

interface ShoplistsModelResponse {
  shoplists?: ShoplistModel[];
}

export interface IShoplistsResponse extends Response {
  body: ShoplistsModelResponse;
}
