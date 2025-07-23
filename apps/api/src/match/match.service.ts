import { Injectable } from '@nestjs/common';
import { IMatchService } from './match.service.interface';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchHistory } from './models/match-history.model';
import { Prisma } from '@prisma/client/output';
import { plainToInstance } from 'class-transformer';
import { MatchRepository } from './match.repository';
import { MatchResponseDto } from './dto/match-response.dto';
import { MatchHistoryResponseDto } from './dto/match-history-response.dto';
import { MatchStandingResponseDto } from './dto/match-standing-response.dto';

@Injectable()
export class MatchService implements IMatchService {
  constructor(private readonly matchRepository: MatchRepository) {}

  async create(dto: CreateMatchDto): Promise<MatchResponseDto> {
    const match = await this.matchRepository.create(dto);
    return plainToInstance(MatchResponseDto, match);
  }

  async findOne(id: string): Promise<MatchResponseDto> {
    const match = await this.matchRepository.findOne(id);
    return plainToInstance(MatchResponseDto, match);
  }

  async findMany(args: Prisma.MatchFindManyArgs): Promise<MatchResponseDto[]> {
    const matches = await this.matchRepository.findMany({
      ...args,
      include: { players: true, rounds: { include: { scores: { include: { player: true } } } } },
    });
    return matches.map((match) => plainToInstance(MatchResponseDto, match));
  }

  async update(id: string, dto: UpdateMatchDto): Promise<MatchResponseDto> {
    const match = await this.matchRepository.update(id, { ...dto });
    return plainToInstance(MatchResponseDto, match);
  }

  async remove(id: string): Promise<MatchResponseDto> {
    const match = await this.matchRepository.remove(id);
    return plainToInstance(MatchResponseDto, match);
  }

  async getMatchesHistory(): Promise<MatchHistoryResponseDto[]> {
    return this.matchRepository.getMatchesHistory();
  }

  async getRecentMatchesByPlayer(playerId: string): Promise<MatchStandingResponseDto[]> {
    const matches = await this.matchRepository.getRecentMatchesByPlayer(playerId);
    return plainToInstance(MatchStandingResponseDto, matches);
  }
}
