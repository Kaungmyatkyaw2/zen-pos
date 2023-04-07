import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ChoicesService } from './choices.service';
import { CreateChoiceDto } from './dto';

@Controller('choices')
export class ChoicesController {
  constructor(private choiceService: ChoicesService) {}

  @Get('?')
  getChoices(@Query('id', ParseIntPipe) optionId: number) {
    return this.choiceService.getChoices(optionId);
  }

  @Post('create?')
  createChoice(
    @Query('option_id', ParseIntPipe) optionId: number,
    @Body() dto: CreateChoiceDto[],
  ) {
    return this.choiceService.createChoice(optionId, dto);
  }

  @Patch('update?')
  updateChoice(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: CreateChoiceDto,
  ) {
    return this.choiceService.updateChoice(id, dto);
  }

  @Patch('toggle?')
  toggleChoice(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: { available: boolean },
  ) {
    return this.choiceService.toggleChoice(id, dto);
  }

  @Delete('delete?')
  deleteChoice(@Query('id', ParseIntPipe) id: number) {
    return this.choiceService.deleteChoice(id);
  }
}
