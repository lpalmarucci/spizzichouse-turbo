import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Round as PrismaRound } from '@prisma/client/output';
import { CreateRoundInput } from './dto/create-round.input';
import { UpdateRoundInput } from './dto/update-round.input';

@Injectable()
export class RoundsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRoundInput): Promise<PrismaRound> {
    const round = await this.prisma.round.create({
      data: {
        status: data.status,
        number: data.number,
        match: { connect: { id: data.matchId } },
      },
    });
    // Crea scores associati
    for (const score of data.scores) {
      await this.prisma.score.create({
        data: {
          points: score.points,
          player: { connect: { id: score.playerId } },
          match: { connect: { id: data.matchId } },
          round: { connect: { id: round.id } },
        },
      });
    }
    return round;
  }

  findAll(matchId: string): Promise<PrismaRound[]> {
    return this.prisma.round.findMany({
      where: { matchId },
      orderBy: { number: 'asc' },
      include: {
        match: { include: { players: true } },
        scores: { include: { player: true } },
      },
    });
  }

  findMany(options: Prisma.RoundFindManyArgs): Promise<PrismaRound[]> {
    return this.prisma.round.findMany(options);
  }

  async findOne(id: string): Promise<PrismaRound> {
    const round = await this.prisma.round.findFirst({
      where: { id },
      include: {
        match: { include: { players: true } },
        scores: { include: { player: true } },
      },
    });
    if (!round) throw new NotFoundException(`Round with id ${id} not found`);
    return round;
  }

  async update(id: string, data: UpdateRoundInput): Promise<PrismaRound> {
    await this.findOne(id);
    return this.prisma.round.update({
      where: { id },
      data: {
        number: data.number,
        status: data.status,
      },
    });
  }

  async remove(id: string): Promise<PrismaRound> {
    await this.findOne(id);
    return this.prisma.round.delete({ where: { id } });
  }
}
