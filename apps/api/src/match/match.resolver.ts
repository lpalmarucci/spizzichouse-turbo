import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MatchService } from './match.service';
import { Match } from './match.entity';
import { CreateMatch } from './models/create-match.model';
import { UpdateMatch } from './models/update-match.model';
import { MatchHistory } from './models/match-history.model';
import { MatchOrderBy } from './models/order-by-match.model';

@Resolver(() => Match)
export class MatchResolver {
  constructor(private readonly matchService: MatchService) {}

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
}
