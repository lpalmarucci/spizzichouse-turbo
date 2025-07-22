import { CreateRoundInput } from './dto/create-round.input';
import { UpdateRoundInput } from './dto/update-round.input';
import { Prisma } from '@prisma/client/output';
import { RoundResponseDto } from './dto/round-response.dto';

export interface IRoundsService {
  create(dto: CreateRoundInput): Promise<RoundResponseDto>;
  findOne(id: string): Promise<RoundResponseDto>;
  findAll(matchId: string): Promise<RoundResponseDto[]>;
  findMany(args: Prisma.RoundFindManyArgs): Promise<RoundResponseDto[]>;
  update(id: string, dto: UpdateRoundInput): Promise<RoundResponseDto>;
  remove(id: string): Promise<RoundResponseDto>;
}
