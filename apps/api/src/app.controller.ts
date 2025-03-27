import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './decorators/user.decorator';
import { Public } from './decorators/public.decorator';
import { JwtAuthGuard } from './auth/guard/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getUserInfo(@User() user: any) {
    console.log(user);
    return user;
  }
}
