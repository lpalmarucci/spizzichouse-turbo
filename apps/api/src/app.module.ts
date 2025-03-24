import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { ClerkAuthGuard } from './auth/clerk-auth.guard';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PlayerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
