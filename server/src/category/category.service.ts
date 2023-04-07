import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getCategories(companyId: string) {
    const categories = await this.prisma.category.findMany({
      where: {
        companyId: companyId,
      },
      include: {
        category_menu_items: {
          include: {
            category: true,
            menu_items: {
              include: {
                category_menu_items: {
                  include: {
                    category: true,
                  },
                },
                options: true,
              },
            },
          },
        },
      },
    });

    const noneMenus = await this.prisma.category_menu_items.findMany({
      where: {
        categoryId: null,
        companyId,
      },
      include: {
        category: true,
        menu_items: {
          include: {
            category_menu_items: {
              include: {
                category: true,
              },
            },
            options: true,
          },
        },
      },
    });

    const none = {
      id: null,
      name: 'None',
      companyId,
      category_menu_items: noneMenus,
      createdAt: null,
      updatedAt: null,
    };

    return [none, ...categories];
  }

  async createCategory(companyId: string, dto: CreateCategoryDto) {
    const category = await this.prisma.category.create({
      data: {
        ...dto,
        companyId,
      },
      include: {
        category_menu_items: {
          include: {
            menu_items: {
              include: {
                options: true,
                category_menu_items: true,
              },
            },
          },
        },
      },
    });

    return category;
  }

  async updateCategory(categoryId: number, dto: CreateCategoryDto) {
    const category = await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        ...dto,
      },
      include: {
        category_menu_items: {
          include: {
            menu_items: {
              include: {
                options: true,
                category_menu_items: true,
              },
            },
          },
        },
      },
    });

    return category;
  }

  async deleteCategory(categoryId: number) {
    const category = await this.prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    return category;
  }
}
