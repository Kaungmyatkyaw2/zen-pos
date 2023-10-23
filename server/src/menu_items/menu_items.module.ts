import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { MenuItemsController } from './menu_items.controller';
import { MenuItemsService } from './menu_items.service';

@Module({
  controllers: [MenuItemsController],
  providers: [MenuItemsService],
  imports: [CloudinaryModule],
})
export class MenuItemsModule {}
