/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Game } from './entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    private cloudinaryService: CloudinaryService
  ) {}

  async create(game: CreateGameInput): Promise<Game> {
    const existingGame = await this.gameRepository.findOne({
      where: { name: game.name },
    });
    if (existingGame) throw new Error('Juego ya existe');
    let avatarUrl = game.avatar;
    if (game.avatar && game.avatar.startsWith('data:image')) {
      avatarUrl = await this.cloudinaryService.uploadFile(game.avatar); // Sube la imagen a Cloudinary
    }
    const newGame = this.gameRepository.create({ ...game, avatar: avatarUrl });
    return this.gameRepository.save(newGame);
  }

  findAll(): Promise<Game[]> {
    return this.gameRepository.find();
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
  } */

  async remove(id: number): Promise<Game> {
    const game = await this.gameRepository.findOne({ where: { id } });
    if (!game) {
      throw new Error(`El juego con id ${id} no existe`);
    }
    await this.gameRepository.delete(game);
    return game;
  }
}
