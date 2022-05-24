import { Injectable } from '@nestjs/common';
import prisma from 'prisma/prisma-instance';
import { ShoplistModel, UpdateShoplistModel } from './shoplist.model';

@Injectable()
export class ShoplistService {
  shoplistsRepository = prisma.shoplists;

  async getShoplistsByUserId(userId: string): Promise<ShoplistModel[]> {
    return await this.shoplistsRepository.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
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
        user: { connect: { id: userId } },
        products: {
          connect: shoplistData.products.map((product) => ({ id: product.id })),
        },
      },
      include: {
        user: true,
        products: true,
      },
    });
  }

  async getShoplistById(userId: string, id: string): Promise<ShoplistModel> {
    return await this.shoplistsRepository.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        user: true,
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
        user: true,
        products: true,
      },
    });
  }

  async deleteShoplist(id: string): Promise<ShoplistModel> {
    return await this.shoplistsRepository.delete({
      where: {
        id,
      },
    });
  }
}
