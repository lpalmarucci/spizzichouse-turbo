import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PlayersModule } from '../players/players.module';

@Module({
  imports: [PlayersModule],
  controllers: [MatchController],
  providers: [MatchService, PrismaService],
})
export class MatchModule {}
