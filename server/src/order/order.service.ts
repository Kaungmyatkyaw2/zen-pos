import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatus } from './dto';
import { UserType } from '../../src/auth/types';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getOrders(user: UserType) {
    const orders = await this.prisma.orders.findMany({
      where: {
        companyId: user.company.id,
      },
      include: {
        order_lines: {
          include: {
            menu_items: true,
            choices: true,
          },
        },
        customer: true,
      },
    });

    return orders;
  }

  async getOrder(id: number) {
    const orders = await this.prisma.orders.findUnique({
      where: {
        id: id,
      },
      include: {
        order_lines: {
          include: {
            menu_items: true,
            choices: true,
          },
        },
        customer: true,
      },
    });

    return orders;
  }

  async createOrder(dto: CreateOrderDto) {
    let amount = dto.orderline.reduce(
      (total, i) =>
        total +
        i.quantity *
          (i.menu.menu_items.price -
            (i.menu.menu_items.price / 100) * i.menu.menu_items.discount),
      0,
    );

    dto.orderline.map((i) =>
      i.choices.map((i) => {
        amount += i.price;
      }),
    );

    let taxAmount = (amount / 100) * dto.taxRate;
    let chargeAmount = (amount / 100) * dto.chargeRate;

    const order = await this.prisma.orders.create({
      data: {
        amount: amount + taxAmount + chargeAmount,
        companyId: dto.company_id,
        customer_id: dto.customer_id,
      },
    });

    const orderline = await this.prisma.$transaction(
      dto.orderline.map((ol) =>
        this.prisma.orderlines.create({
          data: {
            quantity: ol.quantity,
            description: ol.description,
            menu_itemsId: ol.menu.menu_itemsId,
            orderId: order.id,
            choices: {
              connect: ol.choices.map((i) => ({
                id: i.id,
              })),
            },
          },
        }),
      ),
    );

    return order;
  }

  async updateOrderStatus(id: number, dto: UpdateOrderStatus) {
    const updatedOrderlines = await this.prisma.orderlines.updateMany({
      where: {
        orderId: +id,
        status: dto.whichStatus,
      },
      data: {
        status: dto.updateStatus,
      },
    });

    return updatedOrderlines;
  }

  async updateOrderIsPaid(id: number, dto: { isPaid: boolean }) {
    const updatedOrderlines = await this.prisma.orders.update({
      where: {
        id: +id,
      },
      data: {
        isPaid: dto.isPaid,
      },
    });

    return updatedOrderlines;
  }
}
