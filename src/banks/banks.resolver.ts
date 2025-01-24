/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BanksService } from './banks.service';
import { Bank } from './entities/bank.entity';
import { CreateBankInput } from './dto/create-bank.input';
//import { AssignBankInput } from './dto/addUser-bank.input';
//import { UpdateBankInput } from './dto/update-bank.input';

@Resolver(() => Bank)
export class BanksResolver {
  constructor(private readonly banksService: BanksService) {}

  @Mutation(() => Bank)
  createBank(@Args('createBankInput') createBankInput: CreateBankInput) {
    return this.banksService.createBank(createBankInput);
  }

  /* @Mutation(() => Bank)
  assingBankToUser(@Args('assignBankInput') assignGameInput: AssignBankInput) {
    return this.banksService.assignBankToUser(assignGameInput);
  } */

  @Query(() => [Bank], { name: 'banks' })
  findAll() {
    return this.banksService.findAllBanks();
  }

  @Query(() => Bank, { name: 'bank' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.banksService.findOneBankById(id);
  }

  /* @Mutation(() => Bank)
  updateBank(@Args('updateBankInput') updateBankInput: UpdateBankInput) {
    return this.banksService.update(updateBankInput.id, updateBankInput);
  }

  @Mutation(() => Bank)
  removeBank(@Args('id', { type: () => Int }) id: number) {
    return this.banksService.remove(id);
  } */
}
