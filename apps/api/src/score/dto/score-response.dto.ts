import { ApiProperty } from '@nestjs/swagger';

export class ScoreResponseDto {
  @ApiProperty()
  matchId: string;

  @ApiProperty()
  roundId: string;

  @ApiProperty()
  playerId: string;

  @ApiProperty()
  points: number;
}
