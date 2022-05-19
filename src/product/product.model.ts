import { Response } from 'express';

export class ProductModel {
  id: string;
  name: string;
  minPrice: number;
  maxPrice: number;
  weight: string;
  imageUrl: string;
  categoryName: string;
}

interface ProductsModelResponse {
  products?: ProductModel[];
}

export interface IProductsResponse extends Response {
  body: ProductsModelResponse;
}

export interface IFilterProductsRequest extends Response {
  body: {
    categoryName: string;
  };
}
