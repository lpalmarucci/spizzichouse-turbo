import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsArray, IsDateString } from 'class-validator';
import { MatchStatus } from '@prisma/client';

export class CreateMatchDto {
  @ApiProperty({ example: 'Partita di prova', description: 'Titolo del match' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Descrizione della partita', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: MatchStatus, default: MatchStatus.UPCOMING })
  @IsEnum(MatchStatus)
  @IsOptional()
  status?: MatchStatus = MatchStatus.UPCOMING;

  @ApiProperty({ example: '2024-06-01T15:00:00Z', required: false })
  @IsDateString()
  @IsOptional()
  date?: Date;

  @ApiProperty({ example: 90, required: false })
  @IsOptional()
  duration?: number;

  @ApiProperty({ type: [String], description: 'ID dei giocatori', required: false })
  @IsArray()
  @IsOptional()
  playerIds?: string[];
}
