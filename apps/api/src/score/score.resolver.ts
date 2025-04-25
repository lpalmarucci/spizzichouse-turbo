import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ScoreService } from './score.service';
import { Score } from './entities/score.entity';
import { CreateScoreInput } from './dto/create-score.input';
import { UpdateScoreInput } from './dto/update-score.input';

@Resolver(() => Score)
export class ScoreResolver {
  constructor(private readonly scoreService: ScoreService) {}

  @Mutation(() => Score)
  createScore(@Args('createScoreInput') createScoreInput: CreateScoreInput) {
    return this.scoreService.create(createScoreInput);
  }

  @Query(() => [Score], { name: 'score' })
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
}
