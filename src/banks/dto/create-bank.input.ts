/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateBankInput {
  @MinLength(5, {
    message: 'El titulo es demaciado corto',
  })
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  userBankPhone?: string;

  @Field({ nullable: true })
  bankCode?: string;

  @Field({ nullable: true })
  userDniBank?: string;

  @Field({ nullable: true })
  binancePayId?: string;
}
