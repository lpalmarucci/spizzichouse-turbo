import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { type IRoundsService } from './rounds.service.interface';
import { CreateRoundInput } from './dto/create-round.input';
import { UpdateRoundInput } from './dto/update-round.input';
import { plainToInstance } from 'class-transformer';
import { RoundResponseDto } from './dto/round-response.dto';
import { Round } from './round.entity';

@Resolver(() => Round)
export class RoundsResolver {
  constructor(@Inject('IRoundsService') private readonly roundsService: IRoundsService) {}

  @Mutation(() => Round)
  async createRound(@Args('createRoundInput') createRoundInput: CreateRoundInput): Promise<RoundResponseDto> {
    const round = await this.roundsService.create(createRoundInput);
    return plainToInstance(RoundResponseDto, round);
  }

  @Query(() => [Round], { name: 'rounds' })
  async findAll(@Args('matchId') matchId: string): Promise<RoundResponseDto[]> {
    const rounds = await this.roundsService.findAll(matchId);
    return rounds.map((r) => plainToInstance(RoundResponseDto, r));
  }

  @Query(() => Round, { name: 'round' })
  async findOne(@Args('id', { type: () => String }) id: string): Promise<RoundResponseDto> {
    const round = await this.roundsService.findOne(id);
    return plainToInstance(RoundResponseDto, round);
  }

  @Mutation(() => Round)
  async updateRound(
    @Args('id', { type: () => String }) id: string,
    @Args('updateRoundInput') updateRoundInput: UpdateRoundInput,
  ): Promise<RoundResponseDto> {
    const round = await this.roundsService.update(id, updateRoundInput);
    return plainToInstance(RoundResponseDto, round);
  }

  @Mutation(() => Round)
  async removeRound(@Args('id', { type: () => String }) id: string): Promise<RoundResponseDto> {
    const round = await this.roundsService.remove(id);
    return plainToInstance(RoundResponseDto, round);
  }
}
