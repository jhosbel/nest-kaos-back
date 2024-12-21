/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BanksService } from './banks.service';
import { BanksResolver } from './banks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './entities/bank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bank])],
  providers: [BanksResolver, BanksService],
})
export class BanksModule {}
