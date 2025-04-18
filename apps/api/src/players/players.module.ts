import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayerResolver } from './player.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PlayersService, PrismaService, PlayerResolver],
  exports: [PlayersService],
})
export class PlayersModule {}
