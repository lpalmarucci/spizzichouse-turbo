import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Prisma } from '@prisma/client/output';
import { MatchResponseDto } from './dto/match-response.dto';
import { MatchHistoryResponseDto } from './dto/match-history-response.dto';

export interface IMatchService {
  create(dto: CreateMatchDto): Promise<MatchResponseDto>;
  findOne(id: string): Promise<MatchResponseDto>;
  findMany(args: Prisma.MatchFindManyArgs): Promise<MatchResponseDto[]>;
  update(id: string, dto: UpdateMatchDto): Promise<MatchResponseDto>;
  remove(id: string): Promise<MatchResponseDto>;
  getMatchesHistory(): Promise<MatchHistoryResponseDto[]>;
  getRecentMatchesByPlayer(playerId: string): Promise<MatchResponseDto[]>;
}
