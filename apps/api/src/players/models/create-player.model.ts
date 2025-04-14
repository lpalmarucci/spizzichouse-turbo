import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';
import { PlayerLevel, PlayerStatus } from '@prisma/client/output';
import { IsEnum, IsString } from '@nestjs/class-validator';

@InputType()
export class CreatePlayer {
  @Field()
  @IsString()
  full_name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  bio?: string;

  @Field((type) => PlayerLevel, { defaultValue: PlayerLevel.BEGINNER })
  @IsEnum(PlayerLevel)
  level: PlayerLevel;

  @Field((type) => PlayerStatus, { defaultValue: PlayerStatus.ACTIVE })
  @IsEnum(PlayerStatus)
  status: PlayerStatus;
}
