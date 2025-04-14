import { Field, Float, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { MatchStatus } from '@prisma/client/output';
import { Player } from '../players/models/player.model';

registerEnumType(MatchStatus, { name: 'MatchStatus' });

@ObjectType()
export class Match {
  @Field((type) => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => MatchStatus, { defaultValue: MatchStatus.UPCOMING })
  status: MatchStatus;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Float, { nullable: true })
  duration?: number;

  @Field(() => [Player])
  players: Player[];
}
