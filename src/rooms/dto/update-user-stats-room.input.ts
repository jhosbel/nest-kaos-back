/* eslint-disable prettier/prettier */
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserStatsInput {
  @Field(() => Int)
  userId: number;

  @Field(() => Int, { nullable: true })
  kills?: number;

  @Field({ nullable: true })
  timePlayed?: string;

  @Field(() => Int, { nullable: true })
  position?: number;
}