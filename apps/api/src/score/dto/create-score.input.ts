import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString } from '@nestjs/class-validator';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

@InputType()
export class CreateScoreInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  matchId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  roundId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  playerId: string;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  points: number;
}
