import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { PrismaService } from '../prisma/prisma.service';
import { PlayersModule } from '../players/players.module';

describe('MatchController', () => {
  let controller: MatchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PlayersModule],
      controllers: [MatchController],
      providers: [MatchService, PrismaService],
    }).compile();

    controller = module.get<MatchController>(MatchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
