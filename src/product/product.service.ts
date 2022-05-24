import { Injectable } from '@nestjs/common';
import prisma from 'prisma/prisma-instance';
import { ProductModel, UpdateProductModel } from './product.model';

@Injectable()
export class ProductService {
  productsRepository = prisma.products;

  async getAllProducts(): Promise<ProductModel[]> {
    return await this.productsRepository.findMany({
      include: {
        category: true,
      },
    });
  }

  async getProductsByCategorySlug(
    categorySlug: string,
  ): Promise<ProductModel[]> {
    return await this.productsRepository.findMany({
      where: {
        category: {
          slug: categorySlug,
        },
      },
      select: {
        id: true,
        name: true,
        minPrice: true,
        maxPrice: true,
        weight: true,
        imageUrl: true,
        category: true,
        categoryId: true,
      },
    });
  }

  async getFirstProductByCategoryId(categoryId: string): Promise<ProductModel> {
    return await this.productsRepository.findFirst({
      where: {
        categoryId,
      },
    });
  }

  async createProduct(
    product: ProductModel,
    categoryId: string,
  ): Promise<ProductModel> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore to avoid type warning
    return await this.productsRepository.create({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore to avoid type warning
      data: { ...product, category: { connect: { id: categoryId } } },
      include: {
        category: true,
      },
    });
  }

  async getProductById(id: string): Promise<ProductModel> {
    return await this.productsRepository.findFirst({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  async updateProduct(
    product: UpdateProductModel,
    id: string,
  ): Promise<ProductModel> {
    const retrievedProductData = await this.getProductById(id);
    delete retrievedProductData.category;
    const updatedProductData: UpdateProductModel = {
      ...retrievedProductData,
      ...product,
    };
    delete updatedProductData.id;
    return await this.productsRepository.update({
      where: { id },
      data: { ...updatedProductData },
      include: {
        category: true,
      },
    });
  }

  async deleteProduct(id: string): Promise<ProductModel> {
    return await this.productsRepository.delete({
      where: { id },
    });
  }
}
