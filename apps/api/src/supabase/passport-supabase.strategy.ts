import { Request } from 'express';
import { JwtFromRequestFunction } from 'passport-jwt';
import { Strategy } from 'passport-strategy';
import { createClient, SupabaseClient, SupabaseClientOptions, User, UserResponse } from '@supabase/supabase-js';
import { HttpStatus } from '@nestjs/common';

export interface SupabaseAuthStrategyOptions {
  supabaseUrl: string;
  supabaseKey: string;
  supabaseOptions?: SupabaseClientOptions<any>;
  extractor: JwtFromRequestFunction;
}

export const SUPABASE_STRATEGY_NAME = 'supabase';

export class PassportSupabaseStrategy extends Strategy {
  private supabase: SupabaseClient;
  private extractor: JwtFromRequestFunction;
  success: (user: any, info: any) => void;
  fail: Strategy['fail'];

  constructor(options: SupabaseAuthStrategyOptions) {
    super();
    if (!options.extractor) {
      throw new Error(
        '\n Extractor is not a function. You should provide an extractor. \n Read the docs: https://github.com/tfarras/nestjs-firebase-auth#readme',
      );
    }

    this.supabase = createClient(options.supabaseUrl, options.supabaseKey, (options.supabaseOptions = {}));
    this.extractor = options.extractor;
  }

  async validate(payload: User): Promise<User> {
    return payload;
  }

  authenticate(req: Request): void {
    const idToken = this.extractor(req);

    if (!idToken) {
      this.fail('Unauthorized', HttpStatus.UNAUTHORIZED);
      return;
    }

    this.supabase.auth
      .getUser(idToken)
      .then((res: UserResponse) => this.validateSupabaseResponse(res))
      .catch((err) => {
        this.fail(err.message, 401);
      });
  }

  private async validateSupabaseResponse({ data }: UserResponse) {
    if (!data.user) {
      return this.fail('User not found', HttpStatus.UNAUTHORIZED);
    }
    const result = await this.validate(data.user);
    if (result) {
      this.success(result, {});
      return;
    }
    return this.fail('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
