import { MatchResponseDto } from './match-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class MatchStandingResponseDto extends MatchResponseDto {
  @ApiProperty()
  @IsNumber()
  position: number;
}
