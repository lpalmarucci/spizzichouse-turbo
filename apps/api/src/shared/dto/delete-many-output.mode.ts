import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteManyOutput {
  @Field(() => Int)
  count: number;
}
