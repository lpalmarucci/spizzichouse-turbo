import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Player } from './models/player.model';
import { PlayersService } from './players.service';
import { CreatePlayer } from './models/create-player.model';
import { UpdatePlayer } from './models/update-player.model';

@Resolver('Player')
export class PlayerResolver {
  constructor(private readonly playersService: PlayersService) {}

  @Query(() => [Player], { name: 'getAllPlayers' })
  async findAll() {
    return this.playersService.findAll();
  }

  @Query(() => Player, { name: 'getPlayerById' })
  async findById(@Args('id', { type: () => String }) id: string) {
    return this.playersService.findOne(id);
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
