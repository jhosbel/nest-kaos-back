/* eslint-disable prettier/prettier */
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDeposit } from './entities/user-deposit.entity';
import { UserDepositService } from './user-deposit.service';
import { CreateUserDepositInput } from './dto/create-user-deposit.input';
import { Role } from './enum/role';

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

  @Query(() => UserDeposit, { name: 'UserDeposit' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userDepositService.findOne(id);
  }

  @Mutation(() => UserDeposit)
  updateUserDepositRole(
    @Args('id', { type: () => Int }) id: number,
    @Args('newRole', { type: () => Role }) newRole: Role,
  ) {
    return this.userDepositService.updateUserRole(id, newRole);
  }
}
