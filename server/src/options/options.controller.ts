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
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserType } from 'src/auth/types';
import { CreateOptionDto, EditOptionDto } from './dto';
import { OptionsService } from './options.service';

@UseGuards(JwtGuard)
@Controller('options')
export class OptionsController {
  constructor(private optionsService: OptionsService) {}

  @Get()
  getOptions(@GetUser() user: UserType) {
    return this.optionsService.getOptions(user.company.id);
  }

  @Post('create')
  createOption(@GetUser() user: UserType, @Body() dto: CreateOptionDto) {
    return this.optionsService.createOption(user.company.id, dto);
  }

  @Patch('update?')
  updatedOption(
    @Query('id', ParseIntPipe) optionId: number,
    @Body() dto: EditOptionDto,
  ) {
    return this.optionsService.updateOption(optionId, dto);
  }

  @Delete('delete?')
  deleteOption(
    @GetUser() user: UserType,
    @Query('id', ParseIntPipe) optionId: number,
  ) {
    return this.optionsService.deleteOption(user.company.id, optionId);
  }
}
