/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AssignBankInput {
  @Field()
  bankId: number;

  @Field()
  userId: number;

  @Field({ nullable: true })
  binancePayId?: string;

  @Field({ nullable: true })
  bankCode?: string;

  @Field({ nullable: true })
  userBankPhone?: string;

  @Field({ nullable: true })
  userDniBank?: string;
}