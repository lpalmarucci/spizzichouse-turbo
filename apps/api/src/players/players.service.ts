import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Player } from '@workspace/db';

@Injectable()
export class PlayersService {
  constructor(private _prismaService: PrismaService) {}

  create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this._prismaService.player.create({
      data: createPlayerDto,
    });
  }

  findAll() {
    return this._prismaService.player.findMany();
  }

  async findOne(id: string) {
    const player = await this._prismaService.player.findUnique({ where: { id } });
    if (!player) throw new NotFoundException(`Player with id ${id} not found`);
    return player;
  }

  findMany(ids: string[]): Promise<Player[]> {
    return this._prismaService.player.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  update(id: string, updatePlayerDto: UpdatePlayerDto) {
    return this._prismaService.player.update({
      where: {
        id,
      },
      data: updatePlayerDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this._prismaService.player.delete({ where: { id } });
  }
}
