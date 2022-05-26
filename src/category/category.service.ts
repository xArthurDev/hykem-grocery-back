import { Injectable } from '@nestjs/common';
import prisma from 'prisma/prisma-instance';
import { CategoryModel, UpdateCategoryModel } from './category.model';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  categoriesRepository = prisma.categories;

  slugifyOptions = {
    replacement: '-',
    remove: undefined,
    lower: true,
    strict: false,
    locale: 'pt',
    trim: true,
  };

  async getAllCategories(userId: string): Promise<CategoryModel[]> {
    return await this.categoriesRepository.findMany({
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
    });
  }

  async getAllDefaultCategories(): Promise<CategoryModel[]> {
    return await this.categoriesRepository.findMany({
      where: {
        isDefault: true,
        isDeleted: false,
      },
    });
  }

  async createCategory(
    category: CategoryModel,
    userId: string,
  ): Promise<CategoryModel> {
    const categorySlug = slugify(category.name, this.slugifyOptions);
    category = { ...category, slug: categorySlug };
    delete category.userId;
    return await this.categoriesRepository.create({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore to avoid type warning
      data: {
        ...category,
        isDefault: false,
        isDeleted: false,
        user: { connect: { id: userId } },
      },
    });
  }

  async getCategoryById(id: string): Promise<CategoryModel> {
    return await this.categoriesRepository.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  async getCategoryBySlug(slug: string): Promise<CategoryModel> {
    const parsedSlug = slugify(slug, this.slugifyOptions);
    return await this.categoriesRepository.findFirst({
      where: {
        slug: parsedSlug,
        isDeleted: false,
      },
    });
  }

  async updateCategory(
    category: UpdateCategoryModel,
    id: string,
  ): Promise<CategoryModel> {
    const updatedCategorySlug = slugify(category.name, this.slugifyOptions);
    const updatedCategory = { ...category, slug: updatedCategorySlug };
    return await this.categoriesRepository.update({
      where: { id },
      data: { ...updatedCategory },
    });
  }

  async deleteCategory(id: string): Promise<CategoryModel> {
    const retrievedCategoryData = await this.getCategoryById(id);
    delete retrievedCategoryData.id;
    return await this.categoriesRepository.update({
      where: { id },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore to avoid type warning
      data: {
        ...retrievedCategoryData,
        isDeleted: true,
      },
    });
  }
}
