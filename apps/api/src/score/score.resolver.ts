import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ScoreService } from './score.service';
import { Score } from './entities/score.entity';
import { CreateScoreInput } from './dto/create-score.input';
import { UpdateScoreInput } from './dto/update-score.input';
import { DeleteManyOutput } from '../shared/dto/delete-many-output.mode';

@Resolver(() => Score)
export class ScoreResolver {
  constructor(private readonly scoreService: ScoreService) {}

  @Mutation(() => Score, { name: 'addScore' })
  async createScore(@Args('createScoreInput') createScoreInput: CreateScoreInput) {
    return this.scoreService.create(createScoreInput);
  }

  @Query(() => [Score], { name: 'scores' })
  findAll() {
    return this.scoreService.findAll();
  }

  @Mutation(() => Score)
  updateScore(
    @Args('matchId') matchId: string,
    @Args('roundId') roundId: string,
    @Args('playerId') playerId: string,
    @Args('updateScoreInput') updateScoreInput: UpdateScoreInput,
  ) {
    return this.scoreService.update(matchId, roundId, playerId, updateScoreInput);
  }

  @Mutation(() => DeleteManyOutput, { name: 'removeScoreFromRound' })
  removeScoreFromRound(@Args('matchId') matchId: string, @Args('roundId') roundId: string) {
    return this.scoreService.removeScoreFromRound(matchId, roundId);
  }

  @ResolveField('match')
  async match(@Parent() score: Score) {}
}
