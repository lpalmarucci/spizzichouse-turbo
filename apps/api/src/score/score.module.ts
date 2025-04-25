import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreResolver } from './score.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ScoreResolver, ScoreService, PrismaService],
})
export class ScoreModule {}
