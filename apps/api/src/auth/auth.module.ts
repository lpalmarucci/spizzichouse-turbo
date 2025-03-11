import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ClerkStrategy } from './clerk.strategy';
import { ClerkClientProvider } from 'src/providers/clerk-client.provider';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { ClerkAuthGuard } from './clerk-auth.guard';

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [
    ClerkStrategy,
    ClerkClientProvider,
    { 
      provide: APP_GUARD, 
      useClass: ClerkAuthGuard
    }
  ]
})
export class AuthModule {}
