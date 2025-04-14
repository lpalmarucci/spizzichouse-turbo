import { IsEnum, IsNotEmpty, IsString, MaxLength } from '@nestjs/class-validator';
import { PlayerLevel, PlayerStatus } from '@prisma/client/output';
import { IsEmail } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

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
