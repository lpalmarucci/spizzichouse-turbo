import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { PlayerResolver } from './player.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PlayersController],
  providers: [PlayersService, PrismaService, PlayerResolver],
  exports: [PlayersService],
})
export class PlayersModule {}
