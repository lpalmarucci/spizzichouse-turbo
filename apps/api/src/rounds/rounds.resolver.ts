import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RoundsService } from './rounds.service';
import { Round } from './round.entity';
import { CreateRoundInput } from './dto/create-round.input';
import { UpdateRoundInput } from './dto/update-round.input';

@Resolver(() => Round)
export class RoundsResolver {
  constructor(private readonly roundsService: RoundsService) {}

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
}
