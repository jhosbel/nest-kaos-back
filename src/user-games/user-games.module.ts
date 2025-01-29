/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserGamesService } from './user-games.service';
import { UserGamesResolver } from './user-games.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGame } from './entities/user-game.entity';
import { User } from 'src/users/entities/user.entity';
import { Game } from 'src/games/entities/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserGame, User, Game])],
  providers: [UserGamesResolver, UserGamesService],
  exports: [UserGamesService]
})
export class UserGamesModule {}
