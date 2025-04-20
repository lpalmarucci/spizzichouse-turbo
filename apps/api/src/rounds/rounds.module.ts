import { Module } from '@nestjs/common';
import { RoundsService } from './rounds.service';
import { RoundsResolver } from './rounds.resolver';

@Module({
  providers: [RoundsResolver, RoundsService],
})
export class RoundsModule {}
