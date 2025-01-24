/* eslint-disable prettier/prettier */
import { CreateUserBankInput } from './create-user-bank.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserBankInput extends PartialType(CreateUserBankInput) {
  @Field(() => Int)
  id: number;
}
