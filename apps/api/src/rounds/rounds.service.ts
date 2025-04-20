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

    const newPlayerIds = createRoundInput.playerIds.map((playerId) => ({ id: playerId }));

    return this.prismaService.round.create({
      data: {
        status: createRoundInput.status,
        score: createRoundInput.score,
        players: {
          connect: newPlayerIds,
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
    const round = await this.prismaService.round.findFirst({ where: { id }, include: { players: true } });
    if (!round) throw new NotFoundException(`Round with id ${id} not found`);
    return round;
  }

  async update(id: string, updateRoundInput: UpdateRoundInput) {
    const round = await this.findOne(id);

    const currentPlayerIds = round.players.map((p) => p.id);
    const newPlayerIds = updateRoundInput.playerIds || [];

    const playersToDisconnect = currentPlayerIds.filter((id) => !newPlayerIds.includes(id)).map((id) => ({ id }));
    const playersToConnect = newPlayerIds.filter((id) => !currentPlayerIds.includes(id)).map((id) => ({ id }));

    return this.prismaService.round.update({
      where: {
        id,
      },
      data: {
        status: updateRoundInput.status,
        score: updateRoundInput.score,
        players: {
          disconnect: playersToDisconnect,
          connect: playersToConnect,
        },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prismaService.round.delete({ where: { id } });
  }
}
