import { Module } from '@nestjs/common';
import { OrderlineController } from './orderline.controller';
import { OrderlineService } from './orderline.service';

@Module({
  controllers: [OrderlineController],
  providers: [OrderlineService]
})
export class OrderlineModule {}
