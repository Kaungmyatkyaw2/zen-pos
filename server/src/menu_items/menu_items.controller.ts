import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserType } from 'src/auth/types';
import { CreateMenuItemDto, EditMenuItemDto } from './dto';
import { MenuItemsService } from './menu_items.service';

@UseGuards(JwtGuard)
@Controller('menu_items')
export class MenuItemsController {
  constructor(private menuItemService: MenuItemsService) {}

  @Get()
  getMenuItems(@GetUser() user: UserType) {
    return this.menuItemService.getMenuItems(user.company.id);
  }

  @Get('?')
  getMenuItem(@Query('id',ParseIntPipe) menuItemId: number) {
    return this.menuItemService.getMenuItem(menuItemId);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  createMenuItem(
    @GetUser() user: UserType,
    @Body() dto: CreateMenuItemDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.menuItemService.createMenuItem(user.company.id, dto, file);
  }

  @Patch('update?')
  @UseInterceptors(FileInterceptor('file'))
  updateMenuItem(
    @GetUser() user: UserType,
    @Query('id', ParseIntPipe) menuItemId: number,
    @Body() dto: EditMenuItemDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.menuItemService.updateMenuItem(
      user.company.id,
      menuItemId,
      dto,
      file,
    );
  }

  @Delete('delete?')
  deleteMenuItem(
    @GetUser() user: UserType,
    @Query('id', ParseIntPipe) menuItemCategoryId: number,
  ) {
    return this.menuItemService.deleteMenuItem(
      user.company.id,
      menuItemCategoryId,
    );
  }
}
