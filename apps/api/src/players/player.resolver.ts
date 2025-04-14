import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Player } from './models/player.model';
import { PlayersService } from './players.service';
import { CreatePlayer } from './models/create-player.model';

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

  @Mutation(() => Player)
  async createPlayer(@Args('createPlayerDto') player: CreatePlayer) {
    return this.playersService.create(player);
  }
}
