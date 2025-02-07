/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { Role } from './enum/role';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'userOneGame' })
  findOneUserDetails(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOneUserGames(id);
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'userByEmail' })
  findUserByEmail(@Args('email', { type: () => String }) email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  updateUserRole(
    @Args('id', { type: () => Int }) id: number,
    @Args('newRole', { type: () => String }) newRole: Role,
  ) {
    return this.usersService.updateUserRole(id, newRole);
  }
  
  @UseGuards(AuthGuard)
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.removeUser(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  convertCrdToUsd(
    @Args('id', { type: () => Int }) id: number,
    @Args('amount', { type: () => Int }) amount: number,
  ) {
    return this.usersService.convertCrdToUsd(id, amount);
  }
}
