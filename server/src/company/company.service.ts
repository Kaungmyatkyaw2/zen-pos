import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCompanyDto } from './dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async getCompany(companyId: string) {
    const company = await this.prisma.company.findUnique({
      where: {
        id: companyId,
      },
      include: {
        category: {
          include: {
            category_menu_items: {
              include: {
                menu_items: {
                  include: {
                    options: {
                      include: {
                        choices: true,
                      },
                    },
                  },
                },
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
            options: {
              include: {
                choices: true,
              },
            },
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

    return { ...company, category: [none, ...company.category] };
  }

  async updateCompany(companyId: string, dto: UpdateCompanyDto) {
    const updateCompany = await this.prisma.company.update({
      where: {
        id: companyId,
      },
      data: {
        ...dto,
      },
    });

    if (updateCompany) {
      return updateCompany;
    }
  }
}
