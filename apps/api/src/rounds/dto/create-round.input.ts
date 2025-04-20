import { Field, InputType } from '@nestjs/graphql';
import { RoundStatus } from '@prisma/client/output';
import { IsEnum, IsString } from '@nestjs/class-validator';
import { IsArray, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateRoundInput {
  @Field(() => RoundStatus, { defaultValue: RoundStatus.IN_PROGRESS })
  @IsEnum(RoundStatus)
  status: RoundStatus;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty()
  playerIds: string[];

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  matchId: String;
}
