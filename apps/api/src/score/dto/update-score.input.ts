import { CreateScoreInput } from './create-score.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateScoreInput extends PartialType(CreateScoreInput) {
  @Field(() => String)
  id: string;
}
