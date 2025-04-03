import { Injectable } from '@nestjs/common';
import { PassportSupabaseStrategy, SUPABASE_STRATEGY_NAME } from '../../supabase/passport-supabase.strategy';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@supabase/supabase-js';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(PassportSupabaseStrategy, SUPABASE_STRATEGY_NAME) {
  constructor(configService: ConfigService) {
    super({
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
      supabaseKey: configService.get('supabase.key') as string,
      supabaseUrl: configService.get('supabase.url') as string,
    });
  }

  async validate(payload: User): Promise<User> {
    return payload;
  }
}
