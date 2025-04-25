import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoundInput } from './dto/create-round.input';
import { UpdateRoundInput } from './dto/update-round.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoundsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRoundInput: CreateRoundInput) {
    const match = await this.prismaService.match.findUnique({
      where: {
        id: createRoundInput.matchId.toString(),
      },
    });

    if (!match) {
      throw new BadRequestException(`Match not found for id ${createRoundInput.matchId}`);
    }

    return this.prismaService.round.create({
      data: {
        status: createRoundInput.status,
        score: createRoundInput.score,
        number: createRoundInput.number,
        player: {
          connect: { id: createRoundInput.playerId },
        },
        match: {
          connect: {
            id: match.id,
          },
        },
      },
    });
  }

  findAll(matchId: string) {
    return this.prismaService.round.findMany({
      where: {
        matchId,
      },
    });
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
        score: updateRoundInput.score,
        player: {
          connect: { id: updateRoundInput.playerId },
        },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prismaService.round.delete({ where: { id } });
  }
}
