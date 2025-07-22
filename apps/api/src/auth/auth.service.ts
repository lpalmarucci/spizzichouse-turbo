import { Injectable } from '@nestjs/common';
import { IAuthService } from './auth.service.interface';
import { PlayersRepository } from '../players/players.repository';
import { CreatePlayerFromSupabaseDto } from './dto/create-player-from-supabase.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly playersRepository: PlayersRepository) {}

  async createUserIfNotExists(dto: CreatePlayerFromSupabaseDto) {
    const player = await this.playersRepository.findOne(dto.id).catch(() => null);
    if (!player) {
      return this.playersRepository.create(dto);
    }
    return player;
  }
}
