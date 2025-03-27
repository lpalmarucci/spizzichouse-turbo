import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength } from '@nestjs/class-validator';
import { PlayerLevel, PlayerStatus } from '@workspace/db';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(500)
  bio: string;

  @IsEnum(PlayerLevel)
  level: PlayerLevel = PlayerLevel.BEGINNER;

  @IsEnum(PlayerStatus)
  status: PlayerStatus = PlayerStatus.ACTIVE;
}
