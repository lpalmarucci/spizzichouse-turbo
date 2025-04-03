import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PlayersModule } from './players/players.module';
import { PrismaService } from './prisma/prisma.service';
import { MatchModule } from './match/match.module';
import config from './config';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [config] }), SupabaseModule, AuthModule, PlayersModule, MatchModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
