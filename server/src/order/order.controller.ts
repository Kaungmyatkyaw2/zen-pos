import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderStatus } from './dto';
import { GetUser } from 'src/auth/decorator';
import { UserType } from 'src/auth/types';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('create')
  createOrder(@GetUser('id') id: string, @Body() dto: CreateOrderDto) {
    return this.orderService.createOrder({ ...dto, customer_id: id });
  }

  @Get()
  getOrders(@GetUser() user: UserType) {
    return this.orderService.getOrders(user);
  }

  @Get('getOrder?')
  getOrder(@Query('id', ParseIntPipe) id: number) {
    return this.orderService.getOrder(id);
  }

  @Patch('updateOrderStatus?')
  updateOrderStatus(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderStatus,
  ) {
    return this.orderService.updateOrderStatus(id, dto);
  }
}
