/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateRoomInput } from './dto/create-room.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { RoomStatus } from './enums/room-status.enum';
import { UpdateUserStatsInput } from './dto/update-user-stats-room.input';
import { User } from 'src/users/entities/user.entity';
import { UserGame } from 'src/user-games/entities/user-game.entity';
import { GraphQLError } from 'graphql';
//import { UpdateRoomInput } from './dto/update-room.input';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserGame)
    private userGameRepository: Repository<UserGame>,
  ) {}

  createRoom(createRoomInput: CreateRoomInput): Promise<Room> {
    const newRoom = this.roomRepository.create(createRoomInput);
    //newRoom.usersId = [];
    newRoom.userStats = [];
    newRoom.status = RoomStatus.STARTED;
    return this.roomRepository.save(newRoom);
  }

  async addUserToRoom(roomId: number, userId: number, gameId: number) {
    const room = await this.roomRepository.findOne({ where: { id: roomId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const userGame = await this.userGameRepository.findOne({
      where: { userId, gameId },
    });
    if (!room) {
      throw new GraphQLError('Sala no encontrada.');
    }

    const isUserInRoom = room.userStats.some((stats) => stats.userId === userId);
    if (isUserInRoom) {
      throw new GraphQLError('Ya ingresaste en la sala.');
    }

    if (!userGame) {
      throw new GraphQLError('No tienes el juego agregado correspondiente a esta sala!.');
    }

    const newUserStats = {
      userId: userId,
      kills: 0,
      position: 0,
      timePlayed: '',
      gameUserId: userGame.gameUserId,
      nickname: userGame.nickname,
      crdBalance: user.crdBalance,
    };

    room.userStats.push(newUserStats);
    //room.usersId.push(userId);
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
      throw new GraphQLError('Sala no encontrada!.');
    }

    if (room.status === RoomStatus.FINISHED) {
      throw new GraphQLError('Sala ya esta finalizada.');
    }

    room.status = RoomStatus.FINISHED;

    return this.roomRepository.save(room);
  }

  async updateUserStats(roomId: number, stats: UpdateUserStatsInput[]) {
    const room = await this.roomRepository.findOne({ where: { id: roomId } });
    if (!room) {
      throw new GraphQLError('Sala no encontrada!.');
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
    if (!room) throw new GraphQLError('Sala no encontrada!.');
    return this.roomRepository.remove(room);
  }
}
