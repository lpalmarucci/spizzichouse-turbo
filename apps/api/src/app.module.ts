import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PlayerModule } from './player/player.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PlayerModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
