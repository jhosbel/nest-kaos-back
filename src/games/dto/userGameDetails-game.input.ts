/* eslint-disable prettier/prettier */
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UserGameDetailsInput {
  @Field(() => Int)
  gameId?: number;

  @Field(() => Int)
  userId?: number;
  
  @Field({nullable: true})
  nickname?: string;

  @Field({nullable: true})
  gameUserId?: string;
}