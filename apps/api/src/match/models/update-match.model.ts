import { InputType, PartialType } from '@nestjs/graphql';
import { CreateMatch } from './create-match.model';

@InputType()
export class UpdateMatch extends PartialType(CreateMatch) {}
