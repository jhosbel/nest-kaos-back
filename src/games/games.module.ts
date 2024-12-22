/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesResolver } from './games.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { User } from 'src/users/entities/user.entity';
import { UserGame } from './entities/userGame.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game, User, UserGame])],
  providers: [GamesResolver, GamesService],
})
export class GamesModule {}
