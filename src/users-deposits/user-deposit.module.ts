/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDeposit } from './entities/user-deposit.entity';
import { UserDepositService } from './user-deposit.service';
import { UserDepositResolver } from './user-deposit.resolver';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserDeposit, User])],
  providers: [UserDepositResolver, UserDepositService],
  exports: [UserDepositService]
})
export class UserDepositModule {}