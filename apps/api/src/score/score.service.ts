import { Injectable } from '@nestjs/common';
import { IScoreService } from './score.service.interface';
import { ScoreRepository } from './score.repository';
import { CreateScoreInput } from './dto/create-score.input';
import { UpdateScoreInput } from './dto/update-score.input';
import { Prisma } from '@prisma/client/output';
import { plainToInstance } from 'class-transformer';
import { ScoreResponseDto } from './dto/score-response.dto';

@Injectable()
export class ScoreService implements IScoreService {
  constructor(private readonly scoreRepository: ScoreRepository) {}

  async create(dto: CreateScoreInput): Promise<ScoreResponseDto> {
    const score = await this.scoreRepository.create(dto);
    return plainToInstance(ScoreResponseDto, score);
  }

  async findMany(args?: Prisma.ScoreFindManyArgs): Promise<ScoreResponseDto[]> {
    const scores = await this.scoreRepository.findMany(args);
    return scores.map((s) => plainToInstance(ScoreResponseDto, s));
  }

  async update(matchId: string, roundId: string, playerId: string, dto: UpdateScoreInput): Promise<ScoreResponseDto> {
    const score = await this.scoreRepository.update(matchId, roundId, playerId, dto);
    return plainToInstance(ScoreResponseDto, score);
  }

  async removeScoreFromRound(matchId: string, roundId: string): Promise<any> {
    return this.scoreRepository.removeScoreFromRound(matchId, roundId);
  }
}
