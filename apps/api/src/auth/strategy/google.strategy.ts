import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { PrismaService } from '../../prisma/prisma.service';
import { ApiConfig, GoogleAuthConfig } from '../../config/types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService<ApiConfig>,
    private prismaService: PrismaService,
  ) {
    const googleAuth: GoogleAuthConfig = configService.get('auth').google;
    super({
      clientID: googleAuth?.clientID,
      clientSecret: googleAuth?.clientSecret,
      callbackURL: googleAuth?.callbackUrl,
      scope: ['profile', 'email'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { id, name, emails, photos } = profile;

    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    };

    done(null, user);
  }
}
