/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';
//import { AssignGameInput } from './dto/addUser-game.input';
import { User } from 'src/users/entities/user.entity';
import { UserGame } from './entities/userGame.entity';
import { UserGameDetailsInput } from './dto/userGameDetails-game.input';
//import { UpdateGameInput } from './dto/update-game.input';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserGame)
    private userGameRepository: Repository<UserGame>,
  ) {}

  async create(game: CreateGameInput): Promise<Game> {
    const newGame = this.gameRepository.create(game);
    return this.gameRepository.save(newGame);
  }

  async assignGameToUser(userGameDetail: UserGameDetailsInput): Promise<Game> {
    const { gameUserId, nickname, gameId, userId } = userGameDetail;
  
    // Buscar al usuario
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['games'],
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    // Buscar el juego
    const game = await this.gameRepository.findOne({
      where: { id: gameId },
      relations: ['userGameDetail'], // Asegúrate de cargar la relación
    });
  
    if (!game) {
      throw new Error('Game not found');
    }
  
    // Crear el detalle de UserGame
    const newUserGame = this.userGameRepository.create({
      userId,
      gameId,
      gameUserId,
      nickname,
    });
  
    // Guardar el detalle de UserGame
    const savedUserGame = await this.userGameRepository.save(newUserGame);
  
    // Establecer la relación en el juego
    game.userGameDetail = savedUserGame;
  
    // Guardar el juego con la relación actualizada
    await this.gameRepository.save(game);
  
    // Asignar el juego al usuario si no está asignado
    const existingGame = user.games.find((g) => g.id === game.id);
    if (!existingGame) {
      user.games.push(game);
      await this.userRepository.save(user);
    }
  
    return game;
  }

  findAll(): Promise<Game[]> {
    return this.gameRepository.find({ relations: ['userGameDetail', 'user'] });
  }

  async findOneById(id: number): Promise<Game> {
    return this.gameRepository.findOne({
      where: {
        id,
      },
      relations: ['userGameDetail', 'user'],
    });
  }

  /* update(id: number, updateGameInput: UpdateGameInput) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  } */
}
