import { Test, TestingModule } from '@nestjs/testing';
import { RoundsResolver } from './rounds.resolver';
import { RoundsService } from './rounds.service';

describe('RoundsResolver', () => {
  let resolver: RoundsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoundsResolver, RoundsService],
    }).compile();

    resolver = module.get<RoundsResolver>(RoundsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
