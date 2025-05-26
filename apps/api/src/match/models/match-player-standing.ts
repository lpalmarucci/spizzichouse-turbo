import { Field, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { Match } from '../match.entity';

@ObjectType()
export class MatchPlayerStanding extends PartialType(Match) {
  @Field(() => Int)
  position: number;
}
