import { ApiProperty } from '@nestjs/swagger';
import { PlayerLevel, PlayerStatus } from '@prisma/client';

export class PlayerResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  full_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ enum: PlayerLevel })
  level: PlayerLevel;

  @ApiProperty({ enum: PlayerStatus })
  status: PlayerStatus;
}
