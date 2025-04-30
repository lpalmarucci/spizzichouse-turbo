import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MatchHistory {
  @Field(() => Int)
  month: number;

  @Field(() => Int)
  total: number;
}
