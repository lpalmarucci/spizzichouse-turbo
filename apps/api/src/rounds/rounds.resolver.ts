import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RoundsService } from './rounds.service';
import { Round } from './round.entity';
import { CreateRoundInput } from './dto/create-round.input';
import { UpdateRoundInput } from './dto/update-round.input';
import { Match } from '../match/match.entity';
import { PlayersService } from '../players/players.service';
import { MatchService } from '../match/match.service';
import { Score } from '../score/entities/score.entity';
import { ScoreService } from '../score/score.service';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(() => Round)
export class RoundsResolver {
  constructor(
    private readonly roundsService: RoundsService,
    private readonly playersService: PlayersService,
    private readonly matchService: MatchService,
    private readonly scoreService: ScoreService,
    private readonly prismaService: PrismaService,
  ) {}

  @Mutation(() => Round)
  createRound(@Args('createRoundInput') createRoundInput: CreateRoundInput) {
    return this.roundsService.create(createRoundInput);
  }

  @Query(() => [Round], { name: 'rounds' })
  findAll(@Args('matchId') matchId: string) {
    return this.roundsService.findAll(matchId);
  }

  @Query(() => Round, { name: 'round' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.roundsService.findOne(id);
  }

  @Mutation(() => Round)
  updateRound(
    @Args('id', { type: () => String }) id: string,
    @Args('updateRoundInput') updateRoundInput: UpdateRoundInput,
  ) {
    return this.roundsService.update(id, updateRoundInput);
  }

  @Mutation(() => Round)
  removeRound(@Args('id', { type: () => String }) id: string) {
    return this.roundsService.remove(id);
  }

  @ResolveField('match', () => Match)
  async match(@Parent() round: Round) {
    const { id } = round;
    return this.prismaService.match.findMany({
      where: {
        rounds: {
          some: {
            id,
          },
        },
      },
    });
  }

  @ResolveField('scores', () => [Score])
  async scores(@Parent() round: Round) {
    const { id } = round;
    return this.scoreService.findMany({
      where: {
        round: {
          id,
        },
      },
    });
  }
}
