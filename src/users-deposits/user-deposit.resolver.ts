/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDeposit } from './entities/user-deposit.entity';
import { UserDepositService } from './user-deposit.service';
import { CreateUserDepositInput } from './dto/create-user-deposit.input';

@Resolver(() => UserDeposit)
export class UserDepositResolver {
  constructor(private readonly userDepositService: UserDepositService) {}

  @Mutation(() => UserDeposit)
  createUserDeposit(
    @Args('createUserDepositInput')
    createUserDepositInput: CreateUserDepositInput,
  ) {
    return this.userDepositService.createDeposit(createUserDepositInput);
  }

  @Query(() => [UserDeposit], { name: 'UsersDeposits' })
  findAll() {
    return this.userDepositService.findAll();
  }
}
