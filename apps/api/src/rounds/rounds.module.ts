import { Module } from '@nestjs/common';
import { RoundsService } from './rounds.service';
import { RoundsResolver } from './rounds.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { RoundsRepository } from './rounds.repository';

@Module({
  providers: [
    RoundsResolver,
    PrismaService,
    RoundsRepository,
    {
      provide: 'IRoundsService',
      useClass: RoundsService,
    },
  ],
})
export class RoundsModule {}
