import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(dto: CreateOrderDto) {
    const amount = dto.orderline.reduce(
      (total, i) => total + i.quantity * i.menu.menu_items.price,
      0,
    );

    let choiceAmount = 0;

    dto.orderline.map((i) =>
      i.choices.map((i) => {
        choiceAmount += i.price;
      }),
    );

    const order = await this.prisma.orders.create({
      data: {
        amount: amount + choiceAmount,
        companyId: dto.company_id,
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

    return orderline;
  }
}
