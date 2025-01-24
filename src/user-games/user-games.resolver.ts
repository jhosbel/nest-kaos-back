/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserGamesService } from './user-games.service';
import { UserGame } from './entities/user-game.entity';
import { CreateUserGameInput } from './dto/create-user-game.input';
//import { UpdateUserGameInput } from './dto/update-user-game.input';

@Resolver(() => UserGame)
export class UserGamesResolver {
  constructor(private readonly userGamesService: UserGamesService) {}

  @Mutation(() => UserGame)
  assingGameToUser(
    @Args('assingGameToUserInput') createUserGameInput: CreateUserGameInput,
  ) {
    return this.userGamesService.assignGameToUser(createUserGameInput);
  }

  @Query(() => [UserGame], { name: 'userGames' })
  findAll() {
    return this.userGamesService.findAll();
  }

  @Query(() => UserGame, { name: 'userGame' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userGamesService.findOne(id);
  }

  @Query(() => [UserGame], { name: 'userGameDetails' })
  async findUserGameDetails(
    @Args('userId', { type: () => Int }) userId: number,
  ) {
    return this.userGamesService.findUserGameDetails(userId);
  }

  /* @Mutation(() => UserGame)
  updateUserGame(@Args('updateUserGameInput') updateUserGameInput: UpdateUserGameInput) {
    return this.userGamesService.update(updateUserGameInput.id, updateUserGameInput);
  } */

  @Mutation(() => UserGame)
  removeUserGame(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('gameId', { type: () => Int }) gameId: number,
  ) {
    return this.userGamesService.removeUserGame(userId, gameId);
  }
}
