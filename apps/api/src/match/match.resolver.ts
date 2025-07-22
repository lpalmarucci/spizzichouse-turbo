import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { type IMatchService } from './match.service.interface';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchResponseDto } from './dto/match-response.dto';
import { MatchHistoryResponseDto } from './dto/match-history-response.dto';
import { plainToInstance } from 'class-transformer';
import { Match } from './match.entity';
import { UpdateMatch } from './models/update-match.model';
import { CreateMatch } from './models/create-match.model';

@Resolver(() => CreateMatchDto)
export class MatchResolver {
  constructor(@Inject('IMatchService') private readonly matchService: IMatchService) {}

  @Query(() => [Match], { name: 'matches' })
  async getAllMatches(
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @Args('orderBy', { type: () => String, nullable: true }) orderBy?: any,
  ): Promise<MatchResponseDto[]> {
    const matches = await this.matchService.findMany({ take, orderBy });
    return matches.map((m) => plainToInstance(MatchResponseDto, m));
  }

  @Query(() => Match, { name: 'match' })
  async getMatchById(@Args('id') id: string): Promise<MatchResponseDto> {
    const match = await this.matchService.findOne(id);
    return plainToInstance(MatchResponseDto, match);
  }

  @Query(() => [Match], { name: 'recentMatchesHistory' })
  async recentMatchesHistory(): Promise<MatchHistoryResponseDto[]> {
    return this.matchService.getMatchesHistory();
  }

  @Mutation(() => Match, { name: 'createMatch' })
  async createMatch(@Args('data') data: CreateMatch): Promise<MatchResponseDto> {
    const match = await this.matchService.create(data);
    return plainToInstance(MatchResponseDto, match);
  }

  @Mutation(() => Match, { name: 'updateMatch' })
  async updateMatch(@Args('id') id: string, @Args('data') data: UpdateMatch): Promise<MatchResponseDto> {
    const match = await this.matchService.update(id, data);
    return plainToInstance(MatchResponseDto, match);
  }

  @Mutation(() => Match, { name: 'deleteMatch' })
  async deleteMatch(@Args('id') id: string): Promise<MatchResponseDto> {
    const match = await this.matchService.remove(id);
    return plainToInstance(MatchResponseDto, match);
  }
}
