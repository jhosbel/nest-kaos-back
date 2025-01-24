/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserStats {
  @Field(() => Int)
  userId: number;

  @Field(() => Int, { nullable: true })
  kills?: number;

  @Field({ nullable: true })
  timePlayed?: string;

  @Field(() => Int, { nullable: true })
  position?: number;
}
