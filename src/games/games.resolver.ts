/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GamesService } from './games.service';
import { Game } from './entities/game.entity';
import { CreateGameInput } from './dto/create-game.input';
//import { AssignGameInput } from './dto/addUser-game.input';
//import { UserGameDetailsInput } from './dto/userGameDetails-game.input';
//import { UpdateGameInput } from './dto/update-game.input';

@Resolver(() => Game)
export class GamesResolver {
  constructor(private readonly gamesService: GamesService) {}

  @Mutation(() => Game)
  createGame(@Args('createGameInput') createGameInput: CreateGameInput) {
    return this.gamesService.create(createGameInput);
  }

  @Query(() => [Game], { name: 'games' })
  findAllGames() {
    return this.gamesService.findAll();
  }

  @Query(() => Game, { name: 'game' })
  findOneGame(@Args('id', { type: () => Int }) id: number) {
    return this.gamesService.findOneById(id);
  }

  /* @Mutation(() => Game)
  updateGame(@Args('updateGameInput') updateGameInput: UpdateGameInput) {
    return this.gamesService.update(updateGameInput.id, updateGameInput);
  } */

  @Mutation(() => Game)
  async removeGame(@Args('id', { type: () => Int }) id: number): Promise<Game> {
    return this.gamesService.remove(id);
  }
}
