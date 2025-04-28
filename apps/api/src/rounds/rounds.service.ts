import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoundInput } from './dto/create-round.input';
import { UpdateRoundInput } from './dto/update-round.input';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client/output';
import RoundFindManyArgs = Prisma.RoundFindManyArgs;

@Injectable()
export class RoundsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRoundInput: CreateRoundInput) {
    const round = await this.prismaService.round.create({
      data: {
        status: createRoundInput.status,
        number: createRoundInput.number,
        match: {
          connect: {
            id: createRoundInput.matchId.toString(),
          },
        },
      },
    });

    for (let score of createRoundInput.scores) {
      console.log({ score });
      await this.prismaService.score.create({
        data: {
          points: score.points,
          player: {
            connect: {
              id: score.playerId,
            },
          },
          match: {
            connect: {
              id: createRoundInput.matchId.toString(),
            },
          },
          round: {
            connect: {
              id: round.id,
            },
          },
        },
      });
    }

    return round;
  }

  findAll(matchId: string) {
    return this.prismaService.round.findMany({
      where: {
        matchId,
      },
      orderBy: { number: 'asc' },
    });
  }

  findMany(options: RoundFindManyArgs) {
    return this.prismaService.round.findMany(options);
  }

  async findOne(id: string) {
    const round = await this.prismaService.round.findFirst({ where: { id } });
    if (!round) throw new NotFoundException(`Round with id ${id} not found`);
    return round;
  }

  async update(id: string, updateRoundInput: UpdateRoundInput) {
    const round = await this.findOne(id);

    return this.prismaService.round.update({
      where: {
        id,
      },
      data: {
        number: updateRoundInput.number,
        status: updateRoundInput.status,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prismaService.round.delete({ where: { id } });
  }
}
