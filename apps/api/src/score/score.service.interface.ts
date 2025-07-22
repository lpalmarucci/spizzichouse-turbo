import { CreateScoreInput } from './dto/create-score.input';
import { UpdateScoreInput } from './dto/update-score.input';
import { Prisma } from '@prisma/client/output';
import { ScoreResponseDto } from './dto/score-response.dto';

export interface IScoreService {
  create(dto: CreateScoreInput): Promise<ScoreResponseDto>;
  findMany(args?: Prisma.ScoreFindManyArgs): Promise<ScoreResponseDto[]>;
  update(matchId: string, roundId: string, playerId: string, dto: UpdateScoreInput): Promise<ScoreResponseDto>;
  removeScoreFromRound(matchId: string, roundId: string): Promise<any>;
}
