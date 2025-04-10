import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { PrismaService } from '../prisma/prisma.service';
import { PlayersModule } from '../players/players.module';

describe('MatchService', () => {
  let service: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PlayersModule],
      providers: [MatchService, PrismaService],
    }).compile();

    service = module.get<MatchService>(MatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
