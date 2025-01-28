/* eslint-disable prettier/prettier */
import { CreateUserDepositInput } from './create-user-deposit.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDepositInput extends PartialType(CreateUserDepositInput) {
  @Field(() => Int)
  id: number;
}