import { Injectable } from '@nestjs/common';
import prisma from 'prisma/prisma-instance';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
  productsRepository = prisma.products;

  async getAllProducts(): Promise<ProductModel[]> {
    return await this.productsRepository.findMany({
      select: {
        id: true,
        name: true,
        minPrice: true,
        maxPrice: true,
        weight: true,
        imageUrl: true,
        categoryName: true,
      },
    });
  }

  async getFilteredProducts(categoryName: string): Promise<ProductModel[]> {
    return await this.productsRepository.findMany({
      where: {
        categoryName,
      },
      select: {
        id: true,
        name: true,
        minPrice: true,
        maxPrice: true,
        weight: true,
        imageUrl: true,
        categoryName: true,
      },
    });
  }
}
