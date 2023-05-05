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

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('create')
  createOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }

  @UseGuards(JwtGuard)
  @Get()
  getOrders(@GetUser() user: UserType) {
    return this.orderService.getOrders(user);
  }

  @Patch('updateOrderStatus?')
  updateOrderStatus(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderStatus,
  ) {
    return this.orderService.updateOrderStatus(id, dto);
  }
}
