import { Injectable } from '@nestjs/common';
import { CreateScoreInput } from './dto/create-score.input';
import { UpdateScoreInput } from './dto/update-score.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScoreService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createScoreInput: CreateScoreInput) {
    return this.prismaService.score.create({
      data: {
        points: createScoreInput.points,
        player: {
          connect: { id: createScoreInput.playerId.toString() },
        },
        match: {
          connect: { id: createScoreInput.matchId.toString() },
        },
        round: {
          connect: { id: createScoreInput.roundId.toString() },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.score.findMany();
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
