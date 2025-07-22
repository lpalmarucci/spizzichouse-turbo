import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerStats } from './models/player-stats.model';
import { Prisma } from '@prisma/client/output';
import { PlayerResponseDto } from './dto/player-response.dto';
import { PlayerHistoryResponseDto } from './dto/player-history-response.dto';

export interface IPlayersService {
  create(dto: CreatePlayerDto): Promise<PlayerResponseDto>;
  findOne(id: string): Promise<PlayerResponseDto>;
  findMany(args: Prisma.PlayerFindManyArgs): Promise<PlayerResponseDto[]>;
  update(id: string, dto: UpdatePlayerDto): Promise<PlayerResponseDto>;
  remove(id: string): Promise<PlayerResponseDto>;
  getPlayersHistory(): Promise<PlayerHistoryResponseDto[]>;
  getPlayersStats(playerId?: string): Promise<PlayerStats[]>;
}
