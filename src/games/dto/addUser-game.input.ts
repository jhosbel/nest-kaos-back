/* eslint-disable prettier/prettier */
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AssignGameInput {
  @Field(() => Int)
  gameId?: number;

  @Field(() => Int)
  userId?: number;

  @Field({ nullable: true })
  gameUserId?: string;

  @Field({ nullable: true })
  nickname?: string;
}