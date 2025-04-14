import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Match } from '../../match/match.model';
import { PlayerLevel, PlayerStatus } from '@prisma/client/output';

registerEnumType(PlayerLevel, { name: 'PlayerLevel' });
registerEnumType(PlayerStatus, { name: 'PlayerStatus' });

@ObjectType()
export class Player {
  @Field()
  id: string;

  @Field()
  full_name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  bio?: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => PlayerLevel, { defaultValue: PlayerLevel.BEGINNER })
  level: PlayerLevel;

  @Field((type) => PlayerStatus, { defaultValue: PlayerStatus.ACTIVE })
  status: PlayerStatus;

  @Field((type) => [Match], { nullable: true })
  matches?: Match[];
}
