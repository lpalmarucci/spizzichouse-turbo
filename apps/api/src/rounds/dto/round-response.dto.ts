import { ApiProperty } from '@nestjs/swagger';
import { RoundStatus } from '@prisma/client/output';

export class RoundResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: RoundStatus })
  status: RoundStatus;

  @ApiProperty()
  number: number;

  @ApiProperty()
  matchId: string;

  @ApiProperty({ type: [Object], required: false })
  scores?: any[];
}
