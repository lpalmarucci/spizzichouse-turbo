import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Player, Prisma } from '@prisma/client/output';
import { CreatePlayer } from './models/create-player.model';
import { UpdatePlayer } from './models/update-player.model';
import { PlayerHistory } from './models/player-history.model';
import PlayerFindManyArgs = Prisma.PlayerFindManyArgs;

@Injectable()
export class PlayersService {
  constructor(private _prismaService: PrismaService) {}

  create(createPlayerDto: CreatePlayer): Promise<Player> {
    return this._prismaService.player.create({
      data: createPlayerDto,
    });
  }

  async findOne(id: string) {
    const player = await this._prismaService.player.findUnique({ where: { id } });
    if (!player) throw new NotFoundException(`Player with id ${id} not found`);
    return player;
  }

  getPlayersHistory(): Promise<PlayerHistory[]> {
    return this._prismaService.$queryRaw`
      WITH months AS (
          SELECT generate_series(1, 12) AS month
      ),
      player_counts AS (
          SELECT date_part('month', p."createdAt")::int AS month, COUNT(*)::int AS total
          FROM players p
          GROUP BY date_part('month', p."createdAt")
      )
      SELECT m.month, COALESCE(pc.total, 0) AS total
      FROM months m
      LEFT JOIN player_counts pc ON m.month = pc.month
      ORDER BY m.month;
    `;
  }

  findMany(options: PlayerFindManyArgs): Promise<Player[]> {
    return this._prismaService.player.findMany(options);
  }

  update(id: string, updatePlayerDto: UpdatePlayer) {
    return this._prismaService.player.update({
      where: {
        id,
      },
      data: updatePlayerDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this._prismaService.player.delete({ where: { id } });
  }
}
