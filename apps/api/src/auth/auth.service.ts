import { Injectable } from '@nestjs/common';
import { type User } from '@supabase/supabase-js';
import { PrismaService } from '../prisma/prisma.service';
import { PlayerLevel, PlayerStatus } from '@workspace/db';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async createUserIfNotExists(user: User) {
    const player = await this.prismaService.player.findUnique({ where: { id: user.id } });
    if (!player) {
      return this.prismaService.player.create({
        data: {
          id: user.id,
          level: PlayerLevel.BEGINNER,
          status: PlayerStatus.ACTIVE,
          email: user.email ?? '',
          full_name: user.user_metadata.full_name,
          bio: 'A sample of player bio where the character',
        },
      });
    }
  }
}
