import { Field, Float, InputType } from '@nestjs/graphql';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsEnum, IsString } from '@nestjs/class-validator';
import { MatchStatus } from '@prisma/client/output';

@InputType()
export class CreateMatch {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description: string;

  @Field(() => MatchStatus, { defaultValue: MatchStatus.UPCOMING })
  @IsEnum(MatchStatus)
  status: MatchStatus;

  @Field(() => Date)
  @IsDate()
  date: Date;

  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  duration: number;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty()
  playerIds?: string[];
}
