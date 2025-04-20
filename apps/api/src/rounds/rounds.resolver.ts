import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
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
  findAll() {
    return this.roundsService.findAll();
  }

  @Query(() => Round, { name: 'round' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.roundsService.findOne(id);
  }

  @Mutation(() => Round)
  updateRound(@Args('updateRoundInput') updateRoundInput: UpdateRoundInput) {
    return this.roundsService.update(updateRoundInput.id, updateRoundInput);
  }

  @Mutation(() => Round)
  removeRound(@Args('id', { type: () => Int }) id: number) {
    return this.roundsService.remove(id);
  }
}
