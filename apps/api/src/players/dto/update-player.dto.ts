import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { PlayerLevel, PlayerStatus } from '@prisma/client';

export class UpdatePlayerDto {
  @ApiProperty({ example: 'Mario Rossi', description: 'Nome completo del giocatore', required: false })
  @IsString()
  @IsOptional()
  full_name?: string;

  @ApiProperty({ example: 'Bio del giocatore', required: false })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({ enum: PlayerLevel, default: PlayerLevel.BEGINNER, required: false })
  @IsEnum(PlayerLevel)
  @IsOptional()
  level?: PlayerLevel;

  @ApiProperty({ enum: PlayerStatus, default: PlayerStatus.ACTIVE, required: false })
  @IsEnum(PlayerStatus)
  @IsOptional()
  status?: PlayerStatus;
}
