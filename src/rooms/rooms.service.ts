/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateRoomInput } from './dto/create-room.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
//import { UpdateRoomInput } from './dto/update-room.input';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}

  createRoom(createRoomInput: CreateRoomInput): Promise<Room> {
    const newRoom = this.roomRepository.create(createRoomInput);
    newRoom.usersId = [];
    return this.roomRepository.save(newRoom);
  }

  async addUserToRoom(roomId: string, userId: number): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { roomId } });
    if (!room) {
      throw new Error('Room not found');
    }

    if (room.usersId.includes(userId)) {
      throw new Error('User already in the room');
    }

    room.usersId.push(userId); // Agregar el usuario
    return this.roomRepository.save(room);
  }

  findAllRooms(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  findOneRoomById(id: number) {
    return this.roomRepository.findOne({ where: { id } });
  }

  /* update(id: number, updateRoomInput: UpdateRoomInput) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  } */
}
