import { InputType, OmitType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayer } from './create-player.model';

@InputType()
export class UpdatePlayer extends PartialType(OmitType(CreatePlayer, ['email'])) {}
