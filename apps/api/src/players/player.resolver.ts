import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Player } from './models/player.model';
import { PlayersService } from './players.service';
import { CreatePlayer } from './models/create-player.model';
import { UpdatePlayer } from './models/update-player.model';
import { PlayerStatus } from '../@graphql/types';
import { Prisma } from '@prisma/client/output';
import { PlayerHistory } from './models/player-history.model';
import PlayerFindManyArgs = Prisma.PlayerFindManyArgs;

@Resolver('Player')
export class PlayerResolver {
  constructor(private readonly playersService: PlayersService) {}

  @Query(() => [Player], { name: 'players' })
  async findAll(@Args('status', { type: () => String, nullable: true }) status?: PlayerStatus) {
    let options: PlayerFindManyArgs = {};
    if (status) {
      options = {
        where: {
          status,
        },
      };
    }
    return this.playersService.findMany(options);
  }

  @Query(() => Player, { name: 'player' })
  async findById(@Args('id', { type: () => String }) id: string) {
    return this.playersService.findOne(id);
  }

  @Query(() => [PlayerHistory], { name: 'players_history' })
  async getPlayersHistory(): Promise<PlayerHistory[]> {
    return this.playersService.getPlayersHistory();
  }

  @Mutation(() => Player, { name: 'createPlayer' })
  async createPlayer(@Args('player') player: CreatePlayer) {
    return this.playersService.create(player);
  }

  @Mutation(() => Player, { name: 'updatePlayer' })
  async updatePlayer(@Args('id', { type: () => String }) id: string, @Args('player') player: UpdatePlayer) {
    return this.playersService.update(id, player);
  }

  @Mutation(() => Player, { name: 'deletePlayer' })
  async deletePlayer(@Args('id', { type: () => String }) id: string) {
    return this.playersService.remove(id);
  }
}
