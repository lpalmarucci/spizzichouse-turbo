import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlayerDto } from '../players/dto/create-player.dto';
import { Player, PlayerLevel, PlayerStatus } from '@workspace/db';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async signIn(requestUser: any) {
    if (!requestUser) {
      throw new BadRequestException('Unauthenticated');
    }

    let user = await this.findUserByEmail(requestUser.email);

    if (!user) {
      user = await this.registerUser({
        name: requestUser.name,
        email: requestUser.email,
        bio: '',
        level: PlayerLevel.BEGINNER,
        status: PlayerStatus.ACTIVE,
      });
    }

    return this.jwtService.sign({
      sub: user.id,
      name: user.name,
      email: user.email,
    });
  }

  async registerUser(user: CreatePlayerDto): Promise<Player> {
    try {
      return this.prismaService.player.create({ data: user });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findUserByEmail(email: string) {
    const user = await this.prismaService.player.findFirst({ where: { email } });

    if (!user) {
      return null;
    }

    return user;
  }
}
