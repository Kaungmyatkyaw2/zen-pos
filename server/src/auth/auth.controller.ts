import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { SignInAuthDto, SignUpAuthDto } from '../auth/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignUpAuthDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: SignInAuthDto) {
    return this.authService.signin(dto);
  }
}
