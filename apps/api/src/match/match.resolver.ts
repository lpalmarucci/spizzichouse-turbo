import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MatchService } from './match.service';
import { Match } from './match.entity';
import { CreateMatch } from './models/create-match.model';
import { PlayersService } from '../players/players.service';
import { Player } from '../players/models/player.model';
import { UpdateMatch } from './models/update-match.model';
import { Round } from '../rounds/round.entity';
import { RoundsService } from '../rounds/rounds.service';

@Resolver(() => Match)
export class MatchResolver {
  constructor(
    private readonly matchService: MatchService,
    private readonly playersService: PlayersService,
    private readonly roundService: RoundsService,
  ) {}

  @Query(() => [Match], { name: 'matches' })
  async getAllMatches() {
    return this.matchService.findAll();
  }

  @Query(() => Match, { name: 'match' })
  async getMatchById(@Args('id') id: string) {
    return this.matchService.findOne(id);
  }

  @Mutation(() => Match, { name: 'createMatch' })
  async createMatch(@Args('match') match: CreateMatch) {
    return this.matchService.create(match);
  }

  @Mutation(() => Match, { name: 'updateMatch' })
  async updateMatch(@Args('id') id: string, @Args('match') match: UpdateMatch) {
    return this.matchService.update(id, match);
  }

  @Mutation(() => Match, { name: 'deleteMatch' })
  async deleteMatch(@Args('id') id: string) {
    return this.matchService.remove(id);
  }

  @ResolveField('players', () => [Player])
  async players(@Parent() match: Match) {
    const { id } = match;
    return this.playersService.findMany({
      where: {
        matches: {
          some: {
            id,
          },
        },
      },
    });
  }

  @ResolveField('rounds', () => [Round])
  async rounds(@Parent() match: Match) {
    const { id } = match;
    return this.roundService.findMany({
      where: {
        match: {
          id,
        },
      },
    });
  }
}
