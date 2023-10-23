import { Controller, Get, UseGuards } from '@nestjs/common';
import { user } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: user) {
    return user;
  }
}
