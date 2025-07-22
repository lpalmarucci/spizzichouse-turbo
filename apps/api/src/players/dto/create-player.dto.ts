import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { PlayerLevel, PlayerStatus } from '@prisma/client';

export class CreatePlayerDto {
  @ApiProperty({ example: 'Mario Rossi', description: 'Nome completo del giocatore' })
  @IsString()
  full_name: string;

  @ApiProperty({ example: 'mario.rossi@email.com', description: 'Email del giocatore' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Bio del giocatore', required: false })
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
