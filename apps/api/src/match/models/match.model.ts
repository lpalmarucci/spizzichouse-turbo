import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql';
import { MatchStatus } from '@prisma/client/output';
import { Player } from '../../players/models/player.model';

registerEnumType(MatchStatus, { name: 'MatchStatus' });

@ObjectType()
export class Match {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => MatchStatus, { defaultValue: MatchStatus.UPCOMING })
  status: MatchStatus;

  @Field(() => Date)
  date: Date;

  @Field(() => Float)
  duration: number;

  @Field(() => [Player])
  players: Player[];
}
