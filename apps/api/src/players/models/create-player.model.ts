import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { PlayerLevel, PlayerStatus } from '@workspace/db';

@InputType()
export class CreatePlayer {
  @Field()
  full_name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  bio?: string;

  @Field((type) => PlayerLevel, { defaultValue: PlayerLevel.BEGINNER })
  level: PlayerLevel;

  @Field((type) => PlayerStatus, { defaultValue: PlayerStatus.ACTIVE })
  status: PlayerStatus;
}
