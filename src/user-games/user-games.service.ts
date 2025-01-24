/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserGameInput } from './dto/create-user-game.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserGame } from './entities/user-game.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Game } from 'src/games/entities/game.entity';
//import { UpdateUserGameInput } from './dto/update-user-game.input';

@Injectable()
export class UserGamesService {
  constructor(
    @InjectRepository(UserGame)
    private userGameRepository: Repository<UserGame>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Game) private gameRepository: Repository<Game>,
  ) {}

  async assignGameToUser(
    userGameDetail: CreateUserGameInput,
  ): Promise<UserGame> {
    const { gameUserId, nickname, gameId, userId } = userGameDetail;

    // Buscar al usuario
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    // Buscar el juego
    const game = await this.gameRepository.findOne({ where: { id: gameId } });
    if (!game) throw new Error('Game not found');

    // Verificar si ya existe un UserGame con el mismo userId y gameId
    const existingUserGame = await this.userGameRepository.findOne({
      where: { userId, gameId },
    });

    if (existingUserGame) throw new Error('You already have the game');

    // Si el juego no exite se registra uno nuevo
    const newUserGame = this.userGameRepository.create({
      gameAvatar: game.avatar,
      gameName: game.name,
      userId: userId,
      gameId: gameId,
      gameUserId: gameUserId,
      nickname: nickname,
    });

    return this.userGameRepository.save(newUserGame);
  }

  findAll() {
    return this.gameRepository.find({ relations: ['userGameDetails'] });
  }

  findOne(id: number) {
    return this.gameRepository.findOne({
      where: {
        id,
      },
      relations: ['userGameDetails'],
    });
  }

  async findUserGameDetails(userId: number): Promise<UserGame[]> {
    // Buscar al usuario junto con sus detalles de juegos
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['userGameDetails'], // Asegúrate de que este sea el nombre de la relación en tu entidad User
    });

    if (!user) throw new Error('User not found');

    // Retornar los detalles de juegos del usuario
    return user.userGameDetails;
  }

  /* update(id: number, updateUserGameInput: UpdateUserGameInput) {
    return `This action updates a #${id} userGame`;
  } */

  async removeUserGame(userId: number, gameId: number) {
    const userGame = await this.userGameRepository.findOne({
      where: { userId, gameId },
    });

    if (!userGame)
      throw new Error(
        `Game with ID ${gameId} is not assigned to user with ID ${userId}`,
      );
    this.userGameRepository.remove(userGame);
    return userGame;
  }
}
