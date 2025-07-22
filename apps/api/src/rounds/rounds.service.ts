import { Injectable } from '@nestjs/common';
import { IRoundsService } from './rounds.service.interface';
import { RoundsRepository } from './rounds.repository';
import { CreateRoundInput } from './dto/create-round.input';
import { UpdateRoundInput } from './dto/update-round.input';
import { Prisma } from '@prisma/client/output';
import { plainToInstance } from 'class-transformer';
import { RoundResponseDto } from './dto/round-response.dto';

@Injectable()
export class RoundsService implements IRoundsService {
  constructor(private readonly roundsRepository: RoundsRepository) {}

  async create(dto: CreateRoundInput): Promise<RoundResponseDto> {
    const round = await this.roundsRepository.create(dto);
    return plainToInstance(RoundResponseDto, round);
  }

  async findOne(id: string): Promise<RoundResponseDto> {
    const round = await this.roundsRepository.findOne(id);
    return plainToInstance(RoundResponseDto, round);
  }

  async findAll(matchId: string): Promise<RoundResponseDto[]> {
    const rounds = await this.roundsRepository.findAll(matchId);
    return rounds.map((r) => plainToInstance(RoundResponseDto, r));
  }

  async findMany(args: Prisma.RoundFindManyArgs): Promise<RoundResponseDto[]> {
    const rounds = await this.roundsRepository.findMany(args);
    return rounds.map((r) => plainToInstance(RoundResponseDto, r));
  }

  async update(id: string, dto: UpdateRoundInput): Promise<RoundResponseDto> {
    const round = await this.roundsRepository.update(id, dto);
    return plainToInstance(RoundResponseDto, round);
  }

  async remove(id: string): Promise<RoundResponseDto> {
    const round = await this.roundsRepository.remove(id);
    return plainToInstance(RoundResponseDto, round);
  }
}
