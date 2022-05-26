import { Injectable } from '@nestjs/common';
import prisma from 'prisma/prisma-instance';
import { UserService } from 'src/user/user.service';
import { ProductModel, UpdateProductModel } from './product.model';

@Injectable()
export class ProductService {
  productsRepository = prisma.products;

  constructor(private userService: UserService) {}

  async getAllProducts(userId: string): Promise<ProductModel[]> {
    return await this.productsRepository.findMany({
      where: {
        OR: [
          {
            isDeleted: false,
          },
          {
            isDefault: true,
          },
          {
            userId,
          },
        ],
      },
      include: {
        category: true,
      },
    });
  }

  async getProductsByCategorySlug(
    categorySlug: string,
    userId: string,
  ): Promise<ProductModel[]> {
    // TODO: Test this filter
    return await this.productsRepository.findMany({
      where: {
        OR: [
          {
            isDeleted: false,
          },
          {
            isDefault: true,
          },
          {
            userId,
          },
        ],
        category: {
          slug: categorySlug,
        },
      },
    });
  }

  async getFirstProductByCategoryId(categoryId: string): Promise<ProductModel> {
    return await this.productsRepository.findFirst({
      where: {
        categoryId,
        isDeleted: false,
      },
    });
  }

  async createProduct(
    product: ProductModel,
    categoryId: string,
    userId: string,
  ): Promise<ProductModel> {
    delete product.userId;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore to avoid type warning
    const retrievedUserData = await this.userService.getUserDetails(userId);
    return await this.productsRepository.create({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore to avoid type warning
      data: {
        ...product,
        isDefault: retrievedUserData.role === 'ADMIN' ? true : false,
        category: { connect: { id: categoryId } },
        user: { connect: { id: userId } },
      },
      include: {
        category: true,
      },
    });
  }

  async getProductById(id: string): Promise<ProductModel> {
    return await this.productsRepository.findFirst({
      where: { id, isDeleted: false },
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore to avoid type warning
      data: { ...updatedProductData },
      include: {
        category: true,
      },
    });
  }

  async deleteProduct(id: string): Promise<ProductModel> {
    const retrievedProductData = await this.getProductById(id);
    delete retrievedProductData.category;
    delete retrievedProductData.user;
    delete retrievedProductData.id;
    return await this.productsRepository.update({
      where: { id },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore to avoid type warning
      data: { ...retrievedProductData, isDeleted: true },
    });
  }
}
