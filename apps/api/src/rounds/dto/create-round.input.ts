import { Field, InputType, Int } from '@nestjs/graphql';
import { RoundStatus } from '@prisma/client/output';
import { IsEnum, IsPositive, IsString } from '@nestjs/class-validator';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateRoundInput {
  @Field(() => RoundStatus, { defaultValue: RoundStatus.IN_PROGRESS })
  @IsEnum(RoundStatus)
  status: RoundStatus;

  @Field(() => Int, { defaultValue: 0 })
  @IsPositive()
  number: number;

  @Field(() => Int, { defaultValue: 0 })
  @IsPositive()
  score: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  playerId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  matchId: String;
}
