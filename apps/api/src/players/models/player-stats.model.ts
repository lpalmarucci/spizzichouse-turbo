import { Field, Float, Int, ObjectType, OmitType } from '@nestjs/graphql';
import { Player } from './player.model';

@ObjectType()
export class PlayerStats extends OmitType(Player, ['matches', 'rounds']) {
  @Field(() => Int)
  wins: number;

  @Field(() => Int)
  total_matches: number;

  @Field(() => Float)
  win_rate: number;
}
