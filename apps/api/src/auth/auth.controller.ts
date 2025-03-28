import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guard/google.guard';
import { type Request, type Response } from 'express';
import { JwtAuthGuard } from './guard/jwt.guard';
import { ConfigService } from '@nestjs/config';
import { ApiConfig } from '../config/types';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService<ApiConfig>,
  ) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.signIn((req as any).user);

    res.cookie('session', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
      httpOnly: true,
    });

    const redirectUrl = this.configService.get('frontendAfterGoogleSigninUrl');
    return res.redirect(`${redirectUrl}?token=${token}`);
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  hello() {
    return 'hello this is protected from jwt with callback';
  }
}
