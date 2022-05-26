import { Injectable } from '@nestjs/common';
import prisma from 'prisma/prisma-instance';
import { ShoplistModel, UpdateShoplistModel } from './shoplist.model';

@Injectable()
export class ShoplistService {
  shoplistsRepository = prisma.shoplists;

  async getShoplistsByUserId(userId: string): Promise<ShoplistModel[]> {
    return await this.shoplistsRepository.findMany({
      where: {
        isDeleted: false,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        products: true,
      },
    });
  }

  async createShoplist(
    shoplistData: ShoplistModel,
    userId: string,
  ): Promise<ShoplistModel> {
    delete shoplistData.userId;
    return await this.shoplistsRepository.create({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore to avoid type warning
      data: {
        ...shoplistData,
        isDeleted: false,
        user: { connect: { id: userId } },
        products: {
          connect: shoplistData.products.map((product) => ({ id: product.id })),
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        products: true,
      },
    });
  }

  async getShoplistById(userId: string, id: string): Promise<ShoplistModel> {
    return await this.shoplistsRepository.findFirst({
      where: {
        id,
        userId,
        isDeleted: false,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        products: true,
      },
    });
  }

  async updateShoplist(
    shoplist: UpdateShoplistModel,
    userId: string,
    id: string,
  ): Promise<ShoplistModel> {
    const retrievedShoplistData = await this.getShoplistById(userId, id);
    delete retrievedShoplistData.user;
    const updatedShoplistData: UpdateShoplistModel = {
      ...retrievedShoplistData,
      ...shoplist,
    };
    delete updatedShoplistData.id;
    delete updatedShoplistData.userId;
    return await this.shoplistsRepository.update({
      where: {
        id,
      },
      data: {
        ...updatedShoplistData,
        products: {
          connect: updatedShoplistData.products.map((product) => ({
            id: product.id,
          })),
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        products: true,
      },
    });
  }

  async deleteShoplist(userId: string, id: string): Promise<ShoplistModel> {
    const retrievedShoplistData = await this.getShoplistById(userId, id);
    delete retrievedShoplistData.user;
    delete retrievedShoplistData.products;
    delete retrievedShoplistData.id;
    return await this.shoplistsRepository.update({
      where: {
        id,
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore to avoid type warning
      data: {
        ...retrievedShoplistData,
        isDeleted: true,
      },
    });
  }
}
