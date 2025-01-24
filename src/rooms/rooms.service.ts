/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomInput } from './dto/create-room.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { RoomStatus } from './enums/room-status.enum';
import { UpdateUserStatsInput } from './dto/update-user-stats-room.input';
//import { UpdateRoomInput } from './dto/update-room.input';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
  ) {}

  createRoom(createRoomInput: CreateRoomInput): Promise<Room> {
    const newRoom = this.roomRepository.create(createRoomInput);
    newRoom.usersId = [];
    newRoom.userStats = [];
    newRoom.status = RoomStatus.STARTED;
    return this.roomRepository.save(newRoom);
  }

  async addUserToRoom(roomId: number, userId: number) {
    const room = await this.roomRepository.findOne({ where: { id: roomId } });
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

  findOneRoomById(id: number): Promise<Room> {
    return this.roomRepository.findOne({ where: { id } });
  }

  async updateRoomStatusToFinished(roomId: number) {
    const room = await this.roomRepository.findOne({ where: { id: roomId } });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (room.status === RoomStatus.FINISHED) {
      throw new Error('Room is already finished');
    }

    room.status = RoomStatus.FINISHED;

    return this.roomRepository.save(room);
  }

  async updateUserStats(roomId: number, stats: UpdateUserStatsInput[]) {
    const room = await this.roomRepository.findOne({ where: { id: roomId } });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (!room.userStats) {
      room.userStats = [];
    }

    stats.forEach((stat) => {
      const existingStat = room.userStats.find((s) => s.userId === stat.userId);
      if (existingStat) {
        // Actualizar estadísticas existentes
        existingStat.kills = stat.kills ?? existingStat.kills;
        existingStat.timePlayed = stat.timePlayed ?? existingStat.timePlayed;
        existingStat.position = stat.position ?? existingStat.position;
      } else {
        // Agregar nuevas estadísticas
        room.userStats.push(stat);
      }
    });

    return this.roomRepository.save(room);
  }

  /* update(id: number, updateRoomInput: UpdateRoomInput) {
    return `This action updates a #${id} room`;
  } */

  async remove(id: number): Promise<Room> {
    const room = await this.roomRepository.findOne({ where: { id } });
    if(!room) throw new Error('Room not found')
      return this.roomRepository.remove(room)
  }
}
