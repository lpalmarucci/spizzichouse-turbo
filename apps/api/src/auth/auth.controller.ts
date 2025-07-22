import { Controller, Get, Body } from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { type User as AuthUser } from '@supabase/supabase-js';
import { type IAuthService } from './auth.service.interface';
import { CreatePlayerFromSupabaseDto } from './dto/create-player-from-supabase.dto';
import { Inject } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(@Inject('IAuthService') private authService: IAuthService) {}

  @Get('/user/exists')
  checkUserExists(@User() user: AuthUser) {
    // Mappa l'oggetto user di Supabase nel DTO
    const dto: CreatePlayerFromSupabaseDto = {
      id: user.id,
      email: user.email ?? '',
      full_name: user.user_metadata.full_name,
      bio: 'A sample of player bio where the character',
      level: undefined,
      status: undefined,
    };
    return this.authService.createUserIfNotExists(dto);
  }
}
