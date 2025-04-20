import { CreateRoundInput } from './create-round.input';
import { InputType, OmitType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRoundInput extends PartialType(OmitType(CreateRoundInput, ['matchId'])) {}
