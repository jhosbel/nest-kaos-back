/* eslint-disable prettier/prettier */
import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoomInput {
  @Field(() => Int)
  gameId: number;

  @Field()
  roomId: string;

  @Field()
  roomPassword: string;

  @Field(() => Int)
  playersNum: number;

  @Field()
  mode: string;

  @Field()
  time: string;

  @Field()
  date: string;
}
