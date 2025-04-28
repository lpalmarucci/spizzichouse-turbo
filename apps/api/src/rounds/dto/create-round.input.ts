import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { RoundStatus } from '@prisma/client/output';
import { IsEnum, IsString } from '@nestjs/class-validator';
import { IsArray, IsInt, IsNotEmpty, Min } from 'class-validator';
import { CreateScoreInput } from '../../score/dto/create-score.input';
import { Type } from 'class-transformer';

@InputType()
class CreateScore extends OmitType(CreateScoreInput, ['roundId', 'matchId']) {}

@InputType()
export class CreateRoundInput {
  @Field(() => RoundStatus, { defaultValue: RoundStatus.IN_PROGRESS })
  @IsEnum(RoundStatus)
  status: RoundStatus;

  @Field(() => Int, { defaultValue: 0 })
  @IsInt()
  @Min(0)
  number: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  matchId: String;

  @Field(() => [CreateScore])
  @IsArray()
  @Type(() => CreateScore)
  scores: CreateScore[];
}
