/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateUserStatsInput } from './dto/update-user-stats-room.input';
//import { UpdateRoomInput } from './dto/update-room.input';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @Mutation(() => Room)
  createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
    return this.roomsService.createRoom(createRoomInput);
  }

  @Mutation(() => Room)
  addUserToRoom(
    @Args('roomId', { type: () => Int }) roomId: number,
    @Args('userId', { type: () => Int }) userId: number,
    @Args('gameId', { type: () => Int }) gameId: number,
  ) {
    return this.roomsService.addUserToRoom(roomId, userId, gameId);
  }

  @Query(() => [Room], { name: 'rooms' })
  findAll() {
    return this.roomsService.findAllRooms();
  }

  @Query(() => Room, { name: 'room' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.roomsService.findOneRoomById(id);
  }

  @Mutation(() => Room)
  updateRoomStatusToFinished(@Args('id', { type: () => Int }) id: number) {
    return this.roomsService.updateRoomStatusToFinished(id);
  }

  @Mutation(() => Room)
  updateUserStats(
    @Args('roomId', { type: () => Int }) roomId: number,
    @Args('stats', { type: () => [UpdateUserStatsInput] })
    stats: UpdateUserStatsInput[],
  ) {
    return this.roomsService.updateUserStats(roomId, stats);
  }

  /* @Mutation(() => Room)
  updateRoom(@Args('updateRoomInput') updateRoomInput: UpdateRoomInput) {
    return this.roomsService.update(updateRoomInput.id, updateRoomInput);
  }

  @Mutation(() => Room)
  removeRoom(@Args('id', { type: () => Int }) id: number) {
    return this.roomsService.remove(id);
  } */
}
