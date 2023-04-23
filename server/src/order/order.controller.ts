import { Body, Controller, Get, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto';
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

  @UseGuards(
    JwtGuard
  )
  @Get()
  getOrders(@GetUser() user : UserType){
    return this.orderService.getOrders(user);
  }

  @Patch("update?")
  updateOrderStatus(@Query('id',ParseIntPipe) id : number,@Body() dto : {status : string}){
    return ;
    // return this.orderService.updateOrderStatus(id,dto);
  }
}
