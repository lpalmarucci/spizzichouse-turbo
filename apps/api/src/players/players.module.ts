import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersResolver } from './players.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { PlayersRepository } from './players.repository';

@Module({
  providers: [
    PrismaService,
    PlayersResolver,
    PlayersRepository,
    {
      provide: 'IPlayersService',
      useClass: PlayersService,
    },
  ],
  exports: [PlayersRepository],
})
export class PlayersModule {}
