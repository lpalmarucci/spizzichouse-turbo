import { CreatePlayerFromSupabaseDto } from './dto/create-player-from-supabase.dto';

export interface IAuthService {
  createUserIfNotExists(dto: CreatePlayerFromSupabaseDto): Promise<any>;
}
