import { Field, GraphQLISODateTime, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { RoundStatus } from '@prisma/client/output';
import { Match } from '../match/match.entity';
import { Score } from '../score/entities/score.entity';

registerEnumType(RoundStatus, { name: 'RoundStatus' });

@ObjectType()
export class Round {
  @Field(() => String)
  id: string;

  @Field(() => RoundStatus)
  status: RoundStatus;

  @Field(() => Int)
  number: number;

  @Field(() => Int)
  score: number;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => Match)
  match: Match;

  @Field(() => [Score])
  scores: Score[];
}
