import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SUPABASE_STRATEGY_NAME } from '../../supabase/passport-supabase.strategy';

@Injectable()
export class SupabaseGuard extends AuthGuard(SUPABASE_STRATEGY_NAME) {}
