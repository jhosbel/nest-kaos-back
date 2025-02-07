/* eslint-disable prettier/prettier */
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDeposit } from './entities/user-deposit.entity';
import { UserDepositService } from './user-deposit.service';
import { CreateUserDepositInput } from './dto/create-user-deposit.input';
import { Role } from './enum/role';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Resolver(() => UserDeposit)
export class UserDepositResolver {
  constructor(private readonly userDepositService: UserDepositService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => UserDeposit)
  createUserDeposit(
    @Args('createUserDepositInput')
    createUserDepositInput: CreateUserDepositInput,
  ) {
    return this.userDepositService.createDeposit(createUserDepositInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => [UserDeposit], { name: 'UsersDeposits' })
  findAll() {
    return this.userDepositService.findAll();
  }

  @UseGuards(AuthGuard)
  @Query(() => UserDeposit, { name: 'UserDeposit' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userDepositService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UserDeposit)
  updateUserDepositRole(
    @Args('id', { type: () => Int }) id: number,
    @Args('newRole', { type: () => String }) newRole: Role,
  ) {
    return this.userDepositService.updateUserRole(id, newRole);
  }
}
