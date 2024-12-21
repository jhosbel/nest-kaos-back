/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  crdBalance?: number;

  @Field({ nullable: true })
  usdBalance?: number;
}
