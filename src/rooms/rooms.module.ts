/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsResolver } from './rooms.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { User } from 'src/users/entities/user.entity';
import { UserGame } from 'src/user-games/entities/user-game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, User, UserGame])],
  providers: [RoomsResolver, RoomsService],
})
export class RoomsModule {}
