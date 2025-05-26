import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Player, Prisma } from '@prisma/client/output';
import { CreatePlayer } from './models/create-player.model';
import { UpdatePlayer } from './models/update-player.model';
import { PlayerHistory } from './models/player-history.model';
import { PlayerStats } from './models/player-stats.model';
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

  async getPlayersStats(playerId?: string): Promise<PlayerStats[]> {
    const whereCondition = playerId ? Prisma.sql`WHERE p.id = ${playerId}` : Prisma.empty;
    return this._prismaService.$queryRaw<PlayerStats[]>`
      WITH total_scores AS (
        SELECT
          s."matchId",
          s."playerId",
          SUM(s.points) AS total_points
        FROM scores s
        GROUP BY "matchId", "playerId"
      ),
      max_scores AS (
        SELECT
          "matchId",
          MAX(total_points) AS max_points
        FROM total_scores
        GROUP BY "matchId"
      ),
      winners AS (
        SELECT
          ts."playerId",
          ts."matchId"
        FROM total_scores ts
        JOIN max_scores ms
          ON ts."matchId" = ms."matchId"
         AND ts.total_points = ms.max_points
      ),
      total_matches AS (
        SELECT
          mp."B" AS player_id,
          COUNT(mp."A") AS total_matches
        FROM "_MatchToPlayer" mp
        GROUP BY mp."B"
      )
      SELECT
        p.*,
        COUNT(w."matchId")::Int AS wins,
        COALESCE(mp.total_matches, 0)::Int as total_matches,
        COUNT(w."matchId")::decimal / mp.total_matches * 100 as win_rate
      FROM players p
      LEFT JOIN winners w
        ON p.id = w."playerId"
      LEFT JOIN total_matches mp
        ON p.id = mp.player_id
      ${whereCondition}
      GROUP BY p.id, p.full_name, mp.total_matches
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
