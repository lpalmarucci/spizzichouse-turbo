// user-order-by.input.ts
import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client/output';
import SortOrder = Prisma.SortOrder;

registerEnumType(SortOrder, {
  name: 'SortOrder',
});

@InputType()
export class MatchOrderBy {
  @Field(() => SortOrder, { nullable: true })
  date?: SortOrder;
}
