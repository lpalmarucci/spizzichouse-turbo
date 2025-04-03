import { Controller, Get } from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { type User as AuthUser } from '@supabase/supabase-js';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/user/exists')
  checkUserExists(@User() user: AuthUser) {
    return this.authService.createUserIfNotExists(user);
  }
}
