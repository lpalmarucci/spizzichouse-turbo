import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Round } from '../../rounds/round.entity';
import { Match } from '../../match/match.entity';
import { Player } from '../../players/models/player.model';

@ObjectType()
export class Score {
  @Field(() => String)
  id: String;

  @Field(() => Match)
  match: Match;

  @Field(() => Round)
  round: Round;

  @Field(() => Player)
  players: Player;

  @Field(() => Int)
  points: number;
}
