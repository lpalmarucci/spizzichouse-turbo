import { Field, GraphQLISODateTime, ObjectType, registerEnumType } from '@nestjs/graphql';
import { RoundStatus } from '@prisma/client/output';
import { Player } from '../players/models/player.model';
import { Match } from '../match/models/match.model';

registerEnumType(RoundStatus, { name: 'RoundStatus' });

@ObjectType()
export class Round {
  @Field(() => String)
  id: string;

  @Field(() => RoundStatus)
  status: RoundStatus;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => [Player])
  players: Player[];

  @Field(() => Match)
  match: Match;
}
