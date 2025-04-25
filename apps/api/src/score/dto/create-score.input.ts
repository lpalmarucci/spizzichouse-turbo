import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateScoreInput {
  @Field(() => String)
  matchId: string;

  @Field(() => String)
  roundId: String;

  @Field(() => String)
  playerId: String;

  @Field(() => Int)
  points: number;
}
