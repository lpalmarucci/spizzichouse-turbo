import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { PrismaService } from '../prisma/prisma.service';
import { MatchResolver } from './match.resolver';
import { PlayersModule } from '../players/players.module';
import { RoundsService } from '../rounds/rounds.service';

@Module({
  imports: [PlayersModule],
  providers: [MatchService, MatchResolver, PrismaService, RoundsService],
  exports: [MatchService],
})
export class MatchModule {}
