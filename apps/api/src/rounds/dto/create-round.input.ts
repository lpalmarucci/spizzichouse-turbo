import { Field, InputType, Int } from '@nestjs/graphql';
import { RoundStatus } from '@prisma/client/output';
import { IsEnum, IsString } from '@nestjs/class-validator';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

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
}
