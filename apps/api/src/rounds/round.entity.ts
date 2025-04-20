import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Round {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
