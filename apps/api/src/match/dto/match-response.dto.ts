import { ApiProperty } from '@nestjs/swagger';
import { MatchStatus } from '@prisma/client';

export class MatchResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ enum: MatchStatus })
  status: MatchStatus;

  @ApiProperty({ required: false })
  date?: Date;

  @ApiProperty({ required: false })
  duration?: number;

  @ApiProperty({ type: [String], required: false })
  playerIds?: string[];
}
