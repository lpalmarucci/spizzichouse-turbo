import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PlayerHistory {
  @Field(() => Int)
  month: number;

  @Field(() => Int)
  total: number;
}
