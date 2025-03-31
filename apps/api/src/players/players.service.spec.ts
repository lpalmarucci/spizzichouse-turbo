import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from './players.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PlayerService', () => {
  let service: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersService, PrismaService],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
