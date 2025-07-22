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

  @Query(() => [Player])
  async players(): Promise<PlayerResponseDto[]> {
    const players = await this.playersService.findMany({});
    return players.map((player) => plainToInstance(PlayerResponseDto, player));
  }

  @Query(() => Player)
  async player(@Args('id', { type: () => String }) id: string): Promise<PlayerResponseDto> {
    const player = await this.playersService.findOne(id);
    return plainToInstance(PlayerResponseDto, player);
  }

  @Query(() => [Player], { name: 'playersHistory' })
  async playersHistory(): Promise<PlayerHistoryResponseDto[]> {
    return this.playersService.getPlayersHistory();
  }
}
