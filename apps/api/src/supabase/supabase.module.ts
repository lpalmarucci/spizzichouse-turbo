import { SupabaseService } from './supabase.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
