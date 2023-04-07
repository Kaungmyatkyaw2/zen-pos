import { ForbiddenException, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuItemDto, EditMenuItemDto } from './dto';

@Injectable()
export class MenuItemsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async getMenuItems(companyId: string) {
    const menuItem = await this.prisma.category_menu_items.findMany({
      where: {
        companyId: companyId,
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

    return menuItem;
  }

  async getMenuItem(menuItemId: number) {
    const menuItem = await this.prisma.category_menu_items.findUnique({
      where: {
        id: menuItemId,
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

    return menuItem;
  }

  async createMenuItem(
    companyId: string,
    dto: CreateMenuItemDto,
    file: Express.Multer.File,
  ) {
    const menuItemPayload = { ...dto };
    delete menuItemPayload.categoryId;
    delete menuItemPayload.optionId;

    let catIds = JSON.parse(dto.categoryId);
    let optionIds = JSON.parse(dto.optionId);

    let optionPayload = optionIds.map((i) => ({ id: i }));

    let uploadedImage;

    if (file) {
      uploadedImage = await this.cloudinary.uploadImage(file);
    }

    const menuItem = await this.prisma.menu_items.create({
      data: {
        ...menuItemPayload,
        price: +dto.price,
        discount: +menuItemPayload.discount,
        image_url: uploadedImage?.url || null,
        image_public_id: uploadedImage?.public_id || null,
        options: {
          connect: optionPayload,
        },
      },
    });

    if (!menuItem) {
      throw new ForbiddenException(
        `An error occured while creating menu item ${dto.name}`,
      );
    }

    const payload = catIds.map((i) =>
      i !== null
        ? {
            categoryId: +i,
            menu_itemsId: menuItem.id,
            companyId,
          }
        : { menu_itemsId: menuItem.id, companyId },
    );

    let categoryMenu;

    if (payload.length) {
      categoryMenu = await this.prisma.category_menu_items.createMany({
        data: payload,
      });
    } else {
      categoryMenu = await this.prisma.category_menu_items.createMany({
        data: [
          {
            menu_itemsId: menuItem.id,
            companyId,
          },
        ],
      });
    }

    const returnMenu = await this.prisma.category_menu_items.findFirst({
      where: {
        menu_itemsId: menuItem.id,
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

    if (!returnMenu) {
      throw new ForbiddenException('An error occured while creating');
    }

    return returnMenu;
  }

  async updateMenuItem(
    companyId: string,
    menuItemId: number,
    dto: EditMenuItemDto,
    file: Express.Multer.File,
  ) {
    try {
      let updateMenuPayload = {
        description: dto.description,
        discount: +dto.discount || 0,
        name: dto.name,
        price: +dto.price,
        image_public_id: JSON.parse(dto?.image_public_id),
        image_url: JSON.parse(dto?.image_url),
      };

      if (file) {
        if (dto.image_public_id !== null && dto.image_public_id) {
          await this.cloudinary.deleteImage(dto.image_public_id);
        }
        let image = await this.cloudinary.uploadImage(file);
        updateMenuPayload = {
          ...updateMenuPayload,
          image_public_id: image?.public_id,
          image_url: image?.url,
        };
      }

      const toArrayOptionId = JSON.parse(dto.toConnect);
      const disconnectIds = JSON.parse(dto.toDisconnect);

      const connectOptions = toArrayOptionId.map((i) => ({ id: +i }));
      const disconnectOptions = disconnectIds.map((i) => ({ id: +i }));

      await this.prisma.menu_items.update({
        where: {
          id: menuItemId,
        },
        data: {
          ...updateMenuPayload,
          options: {
            disconnect: disconnectOptions,
            connect: connectOptions,
          },
        },
      });

      const deleteMenuCategory =
        await this.prisma.category_menu_items.deleteMany({
          where: {
            menu_itemsId: menuItemId,
            companyId: companyId,
          },
        });

      if (deleteMenuCategory) {
        const catIds = JSON.parse(dto.categoryId);
        const menuCatPayload = catIds.map((i) =>
          i !== null
            ? {
                categoryId: +i,
                menu_itemsId: menuItemId,
                companyId,
                isAvailable: JSON.parse(dto.isAvailable),
              }
            : {
                menu_itemsId: menuItemId,
                companyId,
                isAvailable: JSON.parse(dto.isAvailable),
              },
        );

        const createMenuCat = await this.prisma.category_menu_items.createMany({
          data: menuCatPayload,
        });

        if (createMenuCat) {
          const returnMenu = await this.prisma.category_menu_items.findFirst({
            where: {
              menu_itemsId: menuItemId,
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
          return returnMenu;
        }
      }
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async deleteMenuItem(companyId: string, menuItemCategoryId: number) {
    const menuItemCategory = await this.prisma.category_menu_items.findUnique({
      where: {
        id: menuItemCategoryId,
      },
      include: {
        menu_items: {
          select: {
            category_menu_items: true,
            image_public_id: true,
          },
        },
      },
    });

    if (menuItemCategory.companyId !== companyId || !menuItemCategory) {
      throw new ForbiddenException('Access to resource');
    }

    try {
      let delMenuItemCategory;

      if (menuItemCategory.menu_items.category_menu_items.length !== 1) {
        delMenuItemCategory = await this.prisma.category_menu_items.delete({
          where: {
            id: menuItemCategoryId,
          },
        });

        return delMenuItemCategory;
      }

      if (menuItemCategory.menu_items.image_public_id) {
        await this.cloudinary.deleteImage(
          menuItemCategory.menu_items.image_public_id,
        );
      }
      delMenuItemCategory = await this.prisma.menu_items.delete({
        where: {
          id: menuItemCategory.menu_itemsId,
        },
      });

      return delMenuItemCategory;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
}
