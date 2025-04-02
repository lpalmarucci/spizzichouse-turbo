import { ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportSupabaseStrategy } from '../../supabase/passport-supabase.strategy';
import { User } from '@supabase/supabase-js';

export type JwtPayload = {
  sub: string;
  name: string;
  email: string;
};

@Injectable()
export class JwtStrategy extends PassportSupabaseStrategy {
  constructor(private configService: ConfigService) {
    super({
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
      supabaseKey: configService.get<string>('supabase.key') as string,
      supabaseUrl: configService.get<string>('supabase.url') as string,
    });
  }

  async validate(payload: User) {
    return payload;
  }
}
