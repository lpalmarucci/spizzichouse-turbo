import { ApiProperty } from '@nestjs/swagger';

export class MatchHistoryResponseDto {
  @ApiProperty()
  month: number;

  @ApiProperty()
  total: number;
}
