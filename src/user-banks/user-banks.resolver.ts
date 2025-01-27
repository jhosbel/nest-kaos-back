/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserBanksService } from './user-banks.service';
import { UserBank } from './entities/user-bank.entity';
import { CreateUserBankInput } from './dto/create-user-bank.input';
//import { UpdateUserBankInput } from './dto/update-user-bank.input';

@Resolver(() => UserBank)
export class UserBanksResolver {
  constructor(private readonly userBanksService: UserBanksService) {}

  @Mutation(() => UserBank)
  assignBankToUser(
    @Args('assignBankToUser') createUserBankInput: CreateUserBankInput,
  ) {
    return this.userBanksService.assignBankToUser(createUserBankInput);
  }

  @Query(() => [UserBank], { name: 'userBanks' })
  findAll() {
    return this.userBanksService.findAll();
  }

  @Query(() => UserBank, { name: 'userBank' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userBanksService.findOne(id);
  }

  /* @Mutation(() => UserBank)
  updateUserBank(@Args('updateUserBankInput') updateUserBankInput: UpdateUserBankInput) {
    return this.userBanksService.update(updateUserBankInput.id, updateUserBankInput);
  } */

  @Mutation(() => UserBank)
  removeUserBank(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('bankId', { type: () => Int }) bankId: number,
  ) {
    return this.userBanksService.removeUserBank(userId, bankId);
  }
}
