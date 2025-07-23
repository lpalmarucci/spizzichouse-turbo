import { Injectable, NotFoundException } from '@nestjs/common';
import { IPlayersService } from './players.service.interface';
import { PlayersRepository } from './players.repository';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerHistory } from './models/player-history.model';
import { PlayerStats } from './models/player-stats.model';
import { plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client/output';
import { PlayerResponseDto } from './dto/player-response.dto';
import { PlayerHistoryResponseDto } from './dto/player-history-response.dto';
import { PlayerStatsResponseDto } from './dto/player-stats-response.dto';

@Injectable()
export class PlayersService implements IPlayersService {
  constructor(private readonly playersRepository: PlayersRepository) {}

  async create(dto: CreatePlayerDto): Promise<PlayerResponseDto> {
    const player = await this.playersRepository.create({
      full_name: dto.full_name,
      email: dto.email,
      bio: dto.bio,
      level: dto.level,
      status: dto.status,
    });
    return plainToInstance(PlayerResponseDto, player);
  }

  async findOne(id: string): Promise<PlayerResponseDto> {
    const player = await this.playersRepository.findOne(id);
    return plainToInstance(PlayerResponseDto, player);
  }

  async findMany(args: Prisma.PlayerFindManyArgs): Promise<PlayerResponseDto[]> {
    const players = await this.playersRepository.findMany(args);
    return players.map((player) => plainToInstance(PlayerResponseDto, player));
  }

  async update(id: string, dto: UpdatePlayerDto): Promise<PlayerResponseDto> {
    const player = await this.playersRepository.update(id, {
      ...dto,
    });
    return plainToInstance(PlayerResponseDto, player);
  }

  async remove(id: string): Promise<PlayerResponseDto> {
    const player = await this.playersRepository.remove(id);
    return plainToInstance(PlayerResponseDto, player);
  }

  async getPlayersHistory(): Promise<PlayerHistoryResponseDto[]> {
    return this.playersRepository.getPlayersHistory();
  }

  getPlayersStats(playerId?: string): Promise<PlayerStatsResponseDto[]> {
    return this.playersRepository.getPlayersStats(playerId);
  }

  async getPlayerStats(playerId: string): Promise<PlayerStatsResponseDto> {
    const player = await this.playersRepository.getPlayersStats(playerId);
    if (player.length === 0) {
      throw new NotFoundException('Player not found');
    }
    return plainToInstance(PlayerStatsResponseDto, player.at(0));
  }
}
