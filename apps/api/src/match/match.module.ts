import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { PrismaService } from '../prisma/prisma.service';
import { MatchResolver } from './match.resolver';
import { PlayersModule } from '../players/players.module';
import { MatchRepository } from './match.repository';

@Module({
  imports: [PlayersModule],
  providers: [
    MatchResolver,
    PrismaService,
    MatchRepository,
    {
      provide: 'IMatchService',
      useClass: MatchService,
    },
  ],
})
export class MatchModule {}
