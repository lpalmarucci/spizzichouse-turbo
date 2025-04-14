import { IsEnum, IsString } from '@nestjs/class-validator';
import { MatchStatus } from '@prisma/client/output';
import { IsArray, IsDate, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMatchDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(MatchStatus, { message: () => `status must be a valid enum value: ${Object.values(MatchStatus).join(', ')}` })
  status: MatchStatus = MatchStatus.UPCOMING;

  @IsArray()
  @Type(() => String)
  playerIds?: string[];

  @IsDate()
  date: Date = new Date();

  @IsOptional()
  @IsNumber()
  duration: number;
}
