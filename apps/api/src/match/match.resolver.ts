import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { MatchService } from './match.service';
import { Match } from './match.entity';
import { CreateMatch } from './models/create-match.model';
import { PlayersService } from '../players/players.service';
import { Player } from '../players/models/player.model';
import { UpdateMatch } from './models/update-match.model';
import { Round } from '../rounds/round.entity';
import { RoundsService } from '../rounds/rounds.service';
import { MatchHistory } from './models/match-history.model';
import { Prisma } from '@prisma/client/output';
import { MatchOrderBy } from './models/order-by-match.model';

type MatchOrderByWithAggregationInput = Prisma.MatchOrderByWithAggregationInput;

@Resolver(() => Match)
export class MatchResolver {
  constructor(
    private readonly matchService: MatchService,
    private readonly playersService: PlayersService,
    private readonly roundService: RoundsService,
  ) {}

  @Query(() => [Match], { name: 'matches' })
  async getAllMatches(
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @Args('orderBy', { nullable: true })
    orderBy?: MatchOrderBy,
  ) {
    return this.matchService.findAll({ take, orderBy });
  }

  @Query(() => Match, { name: 'match' })
  async getMatchById(@Args('id') id: string) {
    return this.matchService.findOne(id);
  }

  @Query(() => [MatchHistory], { name: 'matches_history' })
  async getMatchesHistory() {
    return this.matchService.getMatchesHistory();
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
