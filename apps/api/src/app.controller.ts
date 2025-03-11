import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { type User as ClerkUser } from '@clerk/backend';
import { User } from './decorators/user.decorator';
import { ClerkAuthGuard } from './auth/clerk-auth.guard';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  getUserInfo(@User() user: ClerkUser) {
    return user;
  }
}
