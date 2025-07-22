import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { type IScoreService } from './score.service.interface';
import { CreateScoreInput } from './dto/create-score.input';
import { UpdateScoreInput } from './dto/update-score.input';
import { plainToInstance } from 'class-transformer';
import { ScoreResponseDto } from './dto/score-response.dto';
import { Score } from './entities/score.entity';

@Resolver(() => Score)
export class ScoreResolver {
  constructor(@Inject('IScoreService') private readonly scoreService: IScoreService) {}

  @Mutation(() => Score, { name: 'addScore' })
  async createScore(@Args('createScoreInput') createScoreInput: CreateScoreInput): Promise<ScoreResponseDto> {
    const score = await this.scoreService.create(createScoreInput);
    return plainToInstance(ScoreResponseDto, score);
  }

  @Query(() => [Score], { name: 'scores' })
  async findAll(): Promise<ScoreResponseDto[]> {
    const scores = await this.scoreService.findMany();
    return scores.map((s) => plainToInstance(ScoreResponseDto, s));
  }

  @Mutation(() => Score)
  async updateScore(
    @Args('matchId') matchId: string,
    @Args('roundId') roundId: string,
    @Args('playerId') playerId: string,
    @Args('updateScoreInput') updateScoreInput: UpdateScoreInput,
  ): Promise<ScoreResponseDto> {
    const score = await this.scoreService.update(matchId, roundId, playerId, updateScoreInput);
    return plainToInstance(ScoreResponseDto, score);
  }

  @Mutation(() => Boolean, { name: 'removeScoreFromRound' })
  async removeScoreFromRound(@Args('matchId') matchId: string, @Args('roundId') roundId: string): Promise<boolean> {
    const result = await this.scoreService.removeScoreFromRound(matchId, roundId);
    return result.count > 0;
  }
}
