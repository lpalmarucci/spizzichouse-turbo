import { Module } from '@nestjs/common';
import { RoundsService } from './rounds.service';
import { RoundsResolver } from './rounds.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { PlayersService } from '../players/players.service';
import { MatchService } from '../match/match.service';
import { ScoreService } from '../score/score.service';

@Module({
  providers: [RoundsResolver, RoundsService, PrismaService, PlayersService, MatchService, ScoreService],
})
export class RoundsModule {}
