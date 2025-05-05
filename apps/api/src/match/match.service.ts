import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Match, Player, Prisma } from '@prisma/client/output';
import { PlayersService } from '../players/players.service';
import { CreateMatch } from './models/create-match.model';
import { UpdateMatch } from './models/update-match.model';
import { MatchHistory } from './models/match-history.model';
import { MatchOrderBy } from './models/order-by-match.model';
import MatchFindManyArgs = Prisma.MatchFindManyArgs;

@Injectable()
export class MatchService {
  constructor(
    private _prismaService: PrismaService,
    private playerService: PlayersService,
  ) {}

  async create(createMatchDto: CreateMatch): Promise<Match> {
    let users: Player[] = [];
    if (createMatchDto.playerIds && createMatchDto.playerIds.length > 0) {
      users = await this.playerService.findMany({
        where: {
          id: {
            in: createMatchDto.playerIds,
          },
        },
      });
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

  getMatchesHistory(): Promise<MatchHistory[]> {
    return this._prismaService.$queryRaw`
      WITH months AS (
        SELECT generate_series(1, 12) AS month
      ),
      match_counts AS (
        SELECT date_part('month', m.date)::int AS month, COUNT(*)::int AS total
        FROM matches m
        GROUP BY date_part('month', m.date)
      )
      SELECT m.month, COALESCE(mc.total, 0) AS total
      FROM months m
      LEFT JOIN match_counts mc ON m.month = mc.month
      ORDER BY m.month;
    `;
  }

  findAll({ take, orderBy }: { take?: number; orderBy?: MatchOrderBy }) {
    return this._prismaService.match.findMany({
      orderBy: orderBy ?? undefined,
      take,
      include: {
        players: true,
        rounds: {
          include: {
            scores: { include: { player: true } },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const match = await this._prismaService.match.findUnique({
      where: { id },
      include: { players: true, rounds: { include: { scores: { include: { player: true } } } } },
    });
    if (!match) throw new NotFoundException(`Match with id ${id} not found`);
    return match;
  }

  findMany(options: MatchFindManyArgs): Promise<Match[]> {
    return this._prismaService.match.findMany(options);
  }

  async update(id: string, updateMatchDto: UpdateMatch) {
    const match = await this.findOne(id);

    const currentPlayerIds = match.players.map((player) => player.id);
    const newPlayerIds = updateMatchDto.playerIds ?? [];

    const playersToDisconnect = currentPlayerIds.filter((id) => !newPlayerIds.includes(id)).map((id) => ({ id }));
    const playersToConnect = newPlayerIds.filter((id) => !currentPlayerIds.includes(id)).map((id) => ({ id }));

    delete updateMatchDto.playerIds;
    //Updating the record
    return this._prismaService.match.update({
      where: {
        id,
      },
      data: {
        ...updateMatchDto,
        ...(playersToConnect.length > 0
          ? {
              players: {
                disconnect: playersToDisconnect,
                connect: playersToConnect,
              },
            }
          : null),
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
