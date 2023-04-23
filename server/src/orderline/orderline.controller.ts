import { Controller, ParseIntPipe, Patch, Query } from '@nestjs/common';
import { UpdateOrderlineDto } from './dto';
import { OrderlineService } from './orderline.service';

@Controller('orderline')
export class OrderlineController {
    constructor(private orderlineService : OrderlineService){}

    @Patch('update?')
    updateOrderline(@Query('id',ParseIntPipe) id : number,dto : UpdateOrderlineDto){
        return this.orderlineService.updateOrderline(id,dto)
    }

}
