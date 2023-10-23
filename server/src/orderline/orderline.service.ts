import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderlineStatus } from './type';

@Injectable()
export class OrderlineService {
  constructor(private prisma: PrismaService) {}

  async updateOrderlineStatus(id: number, status: OrderlineStatus) {
    const updatedOrderline = await this.prisma.orderlines.update({
      where: {
        id,
      },
      data: {
        status: status,
      },
    });

    if (updatedOrderline) {
      return updatedOrderline;
    }
  }
}
