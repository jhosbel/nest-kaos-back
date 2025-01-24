/* eslint-disable prettier/prettier */
import { RoomStatus } from '../enums/room-status.enum';
import { CreateRoomInput } from './create-room.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRoomInput extends PartialType(CreateRoomInput) {
  @Field(() => Int)
  gameId: number;

  @Field(() => RoomStatus)
  status: RoomStatus;
}
