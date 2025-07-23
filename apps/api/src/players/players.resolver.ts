import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { type IPlayersService } from './players.service.interface';
import { Inject } from '@nestjs/common';
import { PlayerResponseDto } from './dto/player-response.dto';
import { PlayerHistoryResponseDto } from './dto/player-history-response.dto';
import { Player } from './models/player.model';
import { CreatePlayer } from './models/create-player.model';
import { UpdatePlayer } from './models/update-player.model';
import { PlayerStats } from './models/player-stats.model';
import { PlayerStatsResponseDto } from './dto/player-stats-response.dto';
import { PlayerHistory } from './models/player-history.model';
import { PlayerStatus } from '@prisma/client/output';

@Resolver(() => Player)
export class PlayersResolver {
  constructor(@Inject('IPlayersService') private readonly playersService: IPlayersService) {}

  @Mutation(() => Player)
  async createPlayer(@Args('data') data: CreatePlayer): Promise<PlayerResponseDto> {
    const player = await this.playersService.create(data);
    return plainToInstance(PlayerResponseDto, player);
  }

  @Mutation(() => Player)
  async updatePlayer(
    @Args('id', { type: () => String }) id: string,
    @Args('data') data: UpdatePlayer,
  ): Promise<PlayerResponseDto> {
    const player = await this.playersService.update(id, data);
    return plainToInstance(PlayerResponseDto, player);
  }

  @Query(() => [PlayerStats])
  async playersWithStats(): Promise<PlayerStatsResponseDto[]> {
    const playersStats = await this.playersService.getPlayersStats();
    return plainToInstance(PlayerStatsResponseDto, playersStats);
  }

  @Query(() => PlayerStats)
  async playerWithStats(@Args('id', { type: () => String }) id: string): Promise<PlayerStatsResponseDto> {
    const playersStats = await this.playersService.getPlayerStats(id);
    return plainToInstance(PlayerStatsResponseDto, playersStats);
  }

  @Query(() => [Player])
  async players(@Args('status', { nullable: true }) status?: PlayerStatus): Promise<PlayerResponseDto[]> {
    const players = await this.playersService.findMany(status);
    return plainToInstance(PlayerResponseDto, players);
  }

  @Query(() => Player)
  async player(@Args('id', { type: () => String }) id: string): Promise<PlayerResponseDto> {
    const player = await this.playersService.findOne(id);
    return plainToInstance(PlayerResponseDto, player);
  }

  @Query(() => [PlayerHistory], { name: 'playersHistory' })
  async playersHistory(): Promise<PlayerResponseDto[]> {
    const playersHistory = await this.playersService.getPlayersHistory();
    return plainToInstance(PlayerResponseDto, playersHistory);
  }
}
