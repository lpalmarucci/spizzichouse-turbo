import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Score as PrismaScore } from '@prisma/client/output';
import { CreateScoreInput } from './dto/create-score.input';
import { UpdateScoreInput } from './dto/update-score.input';

@Injectable()
export class ScoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateScoreInput): Promise<PrismaScore> {
    const round = await this.prisma.round.findUniqueOrThrow({ where: { id: data.roundId } });
    const match = await this.prisma.match.findUniqueOrThrow({ where: { id: data.matchId } });
    const player = await this.prisma.player.findUniqueOrThrow({ where: { id: data.playerId } });
    return this.prisma.score.create({
      data: {
        points: data.points,
        player: { connect: { id: player.id } },
        match: { connect: { id: match.id } },
        round: { connect: { id: round.id } },
      },
    });
  }

  findMany(options?: Prisma.ScoreFindManyArgs): Promise<PrismaScore[]> {
    return this.prisma.score.findMany({
      ...options,
      include: {
        player: true,
        ...options?.include,
      },
    });
  }

  async update(matchId: string, roundId: string, playerId: string, data: UpdateScoreInput): Promise<PrismaScore> {
    return this.prisma.score.update({
      where: {
        playerId_matchId_roundId: {
          roundId,
          matchId,
          playerId,
        },
      },
      data: {
        points: data.points,
      },
    });
  }

  removeScoreFromRound(matchId: string, roundId: string): Promise<Prisma.BatchPayload> {
    return this.prisma.score.deleteMany({
      where: {
        matchId,
        roundId,
      },
    });
  }
}
