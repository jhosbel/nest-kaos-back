/* eslint-disable prettier/prettier */
import { InputType, Int, Field } from '@nestjs/graphql';
import { RoomStatus } from '../enums/room-status.enum';

@InputType()
export class CreateRoomInput {
  @Field(() => Int)
  gameId: number;

  @Field()
  gameName: string;

  @Field()
  roomGameId: string;

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

  @Field(() => RoomStatus, { defaultValue: RoomStatus.NEW })
  status?: RoomStatus;
}
