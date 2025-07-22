import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsArray, IsDateString } from 'class-validator';
import { MatchStatus } from '@prisma/client';

export class UpdateMatchDto {
  @ApiProperty({ example: 'Partita aggiornata', description: 'Titolo del match', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Descrizione aggiornata', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: MatchStatus, required: false })
  @IsEnum(MatchStatus)
  @IsOptional()
  status?: MatchStatus;

  @ApiProperty({ example: '2024-06-01T15:00:00Z', required: false })
  @IsDateString()
  @IsOptional()
  date?: Date;

  @ApiProperty({ example: 120, required: false })
  @IsOptional()
  duration?: number;

  @ApiProperty({ type: [String], description: 'ID dei giocatori', required: false })
  @IsArray()
  @IsOptional()
  playerIds?: string[];
}
