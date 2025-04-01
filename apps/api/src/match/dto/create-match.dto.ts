import { IsEnum, IsString } from '@nestjs/class-validator';
import { MatchStatus } from '@workspace/db';
import { IsArray, IsDate, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMatchDto {
  @IsString()
  title: string;

  @IsEnum(MatchStatus, { message: () => `status must be a valid enum value: ${Object.values(MatchStatus).join(', ')}` })
  status: MatchStatus = MatchStatus.ACTIVE;

  @IsArray()
  @Type(() => String)
  playerIds?: string[];

  @IsDate()
  date: Date = new Date();

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  duration: number;
}
