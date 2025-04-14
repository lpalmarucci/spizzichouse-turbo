import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Match, Player } from '@prisma/client/output';
import { UpdateMatchDto } from './dto/update-match.dto';
import { PlayersService } from '../players/players.service';

@Injectable()
export class MatchService {
  constructor(
    private _prismaService: PrismaService,
    private playerService: PlayersService,
  ) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    let users: Player[] = [];
    if (createMatchDto.playerIds && createMatchDto.playerIds.length > 0) {
      users = await this.playerService.findMany(createMatchDto.playerIds);
      delete createMatchDto?.playerIds;
    }
    const userIds = users.map((user) => ({
      id: user.id,
    }));

    return this._prismaService.match.create({
      data: {
        ...createMatchDto,
        players: {
          connect: userIds,
        },
      },
      include: {
        players: true,
      },
    });
  }

  findAll() {
    return this._prismaService.match.findMany({
      include: {
        players: true,
      },
    });
  }

  async findOne(id: string) {
    const match = await this._prismaService.match.findUnique({ where: { id }, include: { players: true } });
    if (!match) throw new NotFoundException(`Match with id ${id} not found`);
    return match;
  }

  async update(id: string, updateMatchDto: UpdateMatchDto) {
    const match = await this.findOne(id);

    let users: Player[] = [];
    if (updateMatchDto.playerIds && updateMatchDto.playerIds.length > 0) {
      users = await this.playerService.findMany(updateMatchDto.playerIds);
      delete updateMatchDto?.playerIds;
    }
    const userIds = users.map((user) => ({
      id: user.id,
    }));

    //Deleting old players related to the match
    await this._prismaService.match.update({
      where: {
        id,
      },
      data: {
        players: {
          disconnect: match.players.map((player) => ({ id: player.id })),
        },
      },
    });

    //Updating the record
    return this._prismaService.match.update({
      where: {
        id,
      },
      data: {
        ...updateMatchDto,
        players: {
          connect: userIds,
        },
      },
      include: {
        players: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this._prismaService.match.delete({ where: { id } });
  }
}
