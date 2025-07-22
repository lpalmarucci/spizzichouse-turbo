import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { PlayerLevel, PlayerStatus } from '@prisma/client';

export class CreatePlayerFromSupabaseDto {
  @ApiProperty({ example: 'uuid', description: 'ID utente Supabase' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'user@email.com', description: 'Email utente' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Nome Cognome', description: 'Nome completo' })
  @IsString()
  full_name: string;

  @ApiProperty({ example: 'Bio', required: false })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({ enum: PlayerLevel, default: PlayerLevel.BEGINNER })
  @IsEnum(PlayerLevel)
  @IsOptional()
  level?: PlayerLevel = PlayerLevel.BEGINNER;

  @ApiProperty({ enum: PlayerStatus, default: PlayerStatus.ACTIVE })
  @IsEnum(PlayerStatus)
  @IsOptional()
  status?: PlayerStatus = PlayerStatus.ACTIVE;
}
