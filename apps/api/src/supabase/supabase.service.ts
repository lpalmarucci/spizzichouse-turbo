import { Inject, Injectable, Scope } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { REQUEST } from '@nestjs/core';
import { type Request } from 'express';
import { ApiConfig } from '../config/types';
import { ConfigService } from '@nestjs/config';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseService {
  private clientInstance: SupabaseClient;
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly configService: ConfigService<ApiConfig>,
  ) {}

  getClient() {
    if (this.clientInstance) {
      console.log('ClientInstance already exists for this request scope');
      return this.clientInstance;
    }

    const { url, key } = this.configService.get('supabase');
    this.clientInstance = createClient(url, key, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    });

    return this.clientInstance;
  }
}
