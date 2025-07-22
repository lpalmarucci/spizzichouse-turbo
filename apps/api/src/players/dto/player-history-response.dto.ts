import { ApiProperty } from '@nestjs/swagger';

export class PlayerHistoryResponseDto {
  @ApiProperty()
  month: number;

  @ApiProperty()
  total: number;
}
