import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PlayerStats } from './models/player-stats.model';
import { Prisma, Player as PrismaPlayer } from '@prisma/client/output';
import { PlayerHistoryResponseDto } from './dto/player-history-response.dto';

@Injectable()
export class PlayersRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.PlayerCreateInput): Promise<PrismaPlayer> {
    return this.prisma.player.create({ data });
  }

  async findOne(id: string): Promise<PrismaPlayer> {
    const player = await this.prisma.player.findUnique({ where: { id } });
    if (!player) throw new NotFoundException(`Player with id ${id} not found`);
    return player;
  }

  findMany(options: Prisma.PlayerFindManyArgs): Promise<PrismaPlayer[]> {
    return this.prisma.player.findMany(options);
  }

  update(id: string, data: Prisma.PlayerUpdateInput): Promise<PrismaPlayer> {
    return this.prisma.player.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<PrismaPlayer> {
    await this.findOne(id);
    return this.prisma.player.delete({ where: { id } });
  }

  getPlayersHistory() {
    return this.prisma.$queryRaw<PlayerHistoryResponseDto[]>`
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
    return this.prisma.$queryRaw<PlayerStats[]>`
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
        
        COALESCE(
          CASE
            WHEN mp.total_matches IS NULL OR mp.total_matches = 0 THEN 0
            ELSE (COUNT(w."matchId")::Decimal / mp.total_matches * 100)
          END, 0
        )::Int as win_rate
      FROM players p
      LEFT JOIN winners w
        ON p.id = w."playerId"
      LEFT JOIN total_matches mp
        ON p.id = mp.player_id
      ${whereCondition}
      GROUP BY p.id, p.full_name, mp.total_matches
    `;
  }
}
