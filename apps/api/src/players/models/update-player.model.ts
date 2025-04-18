import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreatePlayer } from './create-player.model';

@InputType()
export class UpdatePlayer extends PartialType(OmitType(CreatePlayer, ['email'])) {}
