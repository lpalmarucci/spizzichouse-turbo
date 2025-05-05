import { Injectable } from '@nestjs/common';
import { CreateScoreInput } from './dto/create-score.input';
import { UpdateScoreInput } from './dto/update-score.input';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client/output';
import ScoreFindManyArgs = Prisma.ScoreFindManyArgs;

@Injectable()
export class ScoreService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createScoreInput: CreateScoreInput) {
    const round = await this.prismaService.round.findUniqueOrThrow({ where: { id: createScoreInput.roundId } });
    const match = await this.prismaService.match.findUniqueOrThrow({ where: { id: createScoreInput.matchId } });
    const player = await this.prismaService.player.findUniqueOrThrow({ where: { id: createScoreInput.playerId } });
    return this.prismaService.score.create({
      data: {
        points: createScoreInput.points,
        player: {
          connect: { id: player.id },
        },
        match: {
          connect: { id: match.id },
        },
        round: {
          connect: { id: round.id },
        },
      },
    });
  }

  findMany(options?: ScoreFindManyArgs) {
    return this.prismaService.score.findMany({
      ...options,
      include: {
        player: true,
        ...options?.include,
      },
    });
  }

  update(matchId: string, roundId: string, playerId: string, updateScoreInput: UpdateScoreInput) {
    return this.prismaService.score.update({
      where: {
        playerId_matchId_roundId: {
          roundId,
          matchId,
          playerId,
        },
      },
      data: {
        points: updateScoreInput.points,
      },
    });
  }

  removeScoreFromRound(matchId: string, roundId: string) {
    return this.prismaService.score.deleteMany({
      where: {
        matchId,
        roundId,
      },
    });
  }
}
