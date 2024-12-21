import { CreateBankInput } from './create-bank.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBankInput extends PartialType(CreateBankInput) {
  @Field(() => Int)
  id: number;
}
