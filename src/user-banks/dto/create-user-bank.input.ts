/* eslint-disable prettier/prettier */
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserBankInput {
  @Field(() => Int)
  userId?: number;

  @Field(() => Int)
  bankId?: number;

  @Field()
  bankName: string;

  @Field({ nullable: true })
  userBankPhone?: string;

  @Field({ nullable: true })
  bankCode?: string;

  @Field({ nullable: true })
  userDniBank?: string;

  @Field({ nullable: true })
  binancePayId?: string;
}
