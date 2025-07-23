import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber } from 'class-validator';

export class PlayerStatsResponseDto {
  @ApiProperty()
  @IsNumber()
  wins: number;

  @ApiProperty()
  @IsNumber()
  total_matches: number;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  win_rate: number;
}
