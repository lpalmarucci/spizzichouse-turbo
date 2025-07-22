import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreResolver } from './score.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { ScoreRepository } from './score.repository';

@Module({
  providers: [
    ScoreResolver,
    ScoreService,
    PrismaService,
    ScoreRepository,
    {
      provide: 'IScoreService',
      useClass: ScoreService,
    },
  ],
})
export class ScoreModule {}
