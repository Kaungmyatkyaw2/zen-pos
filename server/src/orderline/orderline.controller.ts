import { Body, Controller, ParseIntPipe, Patch, Query } from '@nestjs/common';
import { OrderlineService } from './orderline.service';
import { OrderlineStatus } from './type';

@Controller('orderline')
export class OrderlineController {
  constructor(private orderlineService: OrderlineService) {}

  @Patch('updateOrderlineStatus?')
  updateOrderline(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: { status: OrderlineStatus },
  ) {
    return this.orderlineService.updateOrderlineStatus(id, dto.status);
  }
}
