import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MatchStatus, Prisma, Match as PrismaMatch } from '@prisma/client/output';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchHistory } from './models/match-history.model';
import { MatchHistoryResponseDto } from './dto/match-history-response.dto';
import { MatchPlayerStanding } from './models/match-player-standing';
import { plainToInstance } from 'class-transformer';
import { MatchStandingResponseDto } from './dto/match-standing-response.dto';

@Injectable()
export class MatchRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMatchDto): Promise<PrismaMatch> {
    const { playerIds, ...matchData } = data;

    const prismaData: any = { ...matchData };
    if (playerIds && playerIds.length > 0) prismaData.players = { connect: playerIds.map((id) => ({ id })) };
    return this.prisma.match.create({
      data: prismaData,
      include: { players: true },
    });
  }

  async findOne(id: string): Promise<PrismaMatch & { players: { id: string }[] }> {
    const match = await this.prisma.match.findUnique({
      where: { id },
      include: { players: true, rounds: { include: { scores: { include: { player: true } } } } },
    });
    if (!match) throw new NotFoundException(`Match with id ${id} not found`);
    return match;
  }

  findMany(options: Prisma.MatchFindManyArgs): Promise<PrismaMatch[]> {
    return this.prisma.match.findMany(options);
  }

  async update(id: string, data: UpdateMatchDto): Promise<PrismaMatch> {
    const match = await this.findOne(id);
    const currentPlayerIds = match.players.map((player: any) => player.id);
    const newPlayerIds = data.playerIds ?? [];
    const playersToDisconnect = currentPlayerIds.filter((pid) => !newPlayerIds.includes(pid)).map((id) => ({ id }));
    const playersToConnect = newPlayerIds.filter((pid) => !currentPlayerIds.includes(pid)).map((id) => ({ id }));
    const { playerIds, ...matchData } = data;
    return this.prisma.match.update({
      where: { id },
      data: {
        ...matchData,
        ...(playersToConnect.length > 0 || playersToDisconnect.length > 0
          ? {
              players: {
                disconnect: playersToDisconnect,
                connect: playersToConnect,
              },
            }
          : undefined),
      },
      include: { players: true },
    });
  }

  async remove(id: string): Promise<PrismaMatch> {
    const match = await this.findOne(id);
    return this.prisma.match.delete({ where: { id: match.id } });
  }

  getMatchesHistory(): Promise<MatchHistoryResponseDto[]> {
    return this.prisma.$queryRaw`
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

  async getRecentMatchesByPlayer(playerId: string): Promise<MatchStandingResponseDto[]> {
    const matches = await this.prisma.match.findMany({
      where: { players: { some: { id: playerId } }, status: MatchStatus.COMPLETED },
      include: { scores: { include: { player: true } } },
      orderBy: { date: 'desc' },
    });

    const recentMatches = matches.map((match) => {
      const roundsByPlayers = match.scores.reduce(
        (acc, score) => {
          acc[score.player.id] = (acc[score.player.id] || 0) + score.points;
          return acc;
        },
        {} as Record<string, number>,
      );
      const sortedRoundsByPlayers = Object.entries(roundsByPlayers)
        .sort((a, b) => b[1] - a[1])
        .map(([playerId, score]) => playerId);
      const rankingPosition = sortedRoundsByPlayers.indexOf(playerId) + 1;
      return {
        ...match,
        position: rankingPosition,
      };
    });
    return plainToInstance(MatchStandingResponseDto, recentMatches);
  }
}
