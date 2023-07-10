import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from './../../src/auth/decorator';
import { JwtGuard } from './../../src/auth/guard';
import { UserType } from './../../src/auth/types';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto';

@UseGuards(JwtGuard)
@Controller('category')
export class CategoryController {
  constructor(private categorySerivce: CategoryService) {}

  @Get()
  getCategories(@GetUser() user: UserType) {
    return this.categorySerivce.getCategories(user.company.id);
  }

  @Post('create')
  createCategory(@GetUser() user: UserType, @Body() dto: CreateCategoryDto) {
    return this.categorySerivce.createCategory(user.company.id, dto);
  }

  @Patch('update?')
  updateCategory(
    @Query('id', ParseIntPipe) categoryId: number,
    @Body() dto: CreateCategoryDto,
  ) {
    return this.categorySerivce.updateCategory(categoryId, dto);
  }

  @Delete('delete?')
  deleteCategory(
    @Query('id', ParseIntPipe) categoryId: number,
  ) {
    return this.categorySerivce.deleteCategory(categoryId);
  }

}
