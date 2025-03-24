import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from '@nestjs/class-validator';
import { PlayerLevel, PlayerStatus } from '@workspace/types';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(500)
  @IsOptional()
  bio: string;

  @IsEnum(PlayerLevel)
  level: PlayerLevel = PlayerLevel.BEGINNER;

  @IsEnum(PlayerStatus)
  status: PlayerStatus = PlayerStatus.ACTIVE;
}
