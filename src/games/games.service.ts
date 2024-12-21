/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';
import { AssignGameInput } from './dto/addUser-game.input';
import { User } from 'src/users/entities/user.entity';
//import { UpdateGameInput } from './dto/update-game.input';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(game: CreateGameInput): Promise<Game> {
    const newGame = this.gameRepository.create(game);
    return this.gameRepository.save(newGame);
  }

  async assignGameToUser(assignGameInput: AssignGameInput): Promise<Game> {
    const { gameId, userId, gameUserId, nickname } = assignGameInput;
  
    // Buscar al usuario
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['games'],
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    // Buscar el juego
    const game = await this.gameRepository.findOneBy({ id: gameId });
    if (!game) {
      throw new Error('Game not found');
    }
  
    // Verificar si el juego ya está asignado al usuario
    const existingGame = user.games.find((g) => g.id === game.id);
    if (!existingGame) {
      // Asignar el juego al usuario
      user.games.push(game);
  
      // Asignar valores adicionales si están presentes
      if (gameUserId) {
        game.gameUserId = gameUserId;
      }
      if (nickname) {
        game.nickname = nickname;
      }
  
      // Asignar el userId al juego
      game.userId = userId;
  
      // Guardar la relación entre el juego y el usuario
      await this.userRepository.save(user);
    }
  
    // Guardar el juego después de asignarlo al usuario
    await this.gameRepository.save(game);
  
    return game; // Devolver el juego con el userId asignado
  }

  findAll(): Promise<Game[]> {
    return this.gameRepository.find({ relations: ['user'] });
  }

  async findOneById(id: number): Promise<Game> {
    return this.gameRepository.findOne({
      where: {
        id,
      },
    });
  }

  /* update(id: number, updateGameInput: UpdateGameInput) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  } */
}
