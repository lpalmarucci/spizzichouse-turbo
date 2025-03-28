import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiConfig, JwtAuthConfig } from '../../config/types';
import { PrismaService } from '../../prisma/prisma.service';

export type JwtPayload = {
  sub: string;
  name: string;
  email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService<ApiConfig>,
    private prismaService: PrismaService,
  ) {
    const extractJwtFromCookieOrHeader = (req: any) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['session'];
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    const jwtAuthConfig: JwtAuthConfig = configService.get('auth').jwt;

    super({
      ignoreExpiration: false,
      secretOrKey: jwtAuthConfig?.secret!,
      jwtFromRequest: extractJwtFromCookieOrHeader,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prismaService.player.findUnique({ where: { id: payload.sub } });

    if (!user) throw new UnauthorizedException('Please log in to continue');

    return {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
    };
  }
}
