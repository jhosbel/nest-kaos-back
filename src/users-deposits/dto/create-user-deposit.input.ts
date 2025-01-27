/* eslint-disable prettier/prettier */
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserDepositInput {
  @Field()
  deposit?: string;

  @Field()
  depositImage?: string;

  @Field(() => Int)
  userId: number;
}
