/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoomsService } from './rooms.service';
import { Room } from './entities/room.entity';
import { CreateRoomInput } from './dto/create-room.input';
import { UpdateUserStatsInput } from './dto/update-user-stats-room.input';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UseGuards } from '@nestjs/common';
//import { UpdateRoomInput } from './dto/update-room.input';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Room)
  createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
    return this.roomsService.createRoom(createRoomInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Room)
  addUserToRoom(
    @Args('roomId', { type: () => Int }) roomId: number,
    @Args('userId', { type: () => Int }) userId: number,
    @Args('gameId', { type: () => Int }) gameId: number,
  ) {
    return this.roomsService.addUserToRoom(roomId, userId, gameId);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Room], { name: 'rooms' })
  findAll() {
    return this.roomsService.findAllRooms();
  }

  @UseGuards(AuthGuard)
  @Query(() => Room, { name: 'room' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.roomsService.findOneRoomById(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Room)
  updateRoomStatusToFinished(@Args('id', { type: () => Int }) id: number) {
    return this.roomsService.updateRoomStatusToFinished(id);
  }

  @UseGuards(AuthGuard)
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
