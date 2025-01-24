/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserBanksService } from './user-banks.service';
import { UserBanksResolver } from './user-banks.resolver';
import { UserBank } from './entities/user-bank.entity';
import { User } from 'src/users/entities/user.entity';
import { Bank } from 'src/banks/entities/bank.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserBank, User, Bank])],
  providers: [UserBanksResolver, UserBanksService],
})
export class UserBanksModule {}
