/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDepositInput } from './dto/create-user-deposit.input';
import { UserDeposit } from './entities/user-deposit.entity';

@Injectable()
export class UserDepositService {
  constructor(
    @InjectRepository(UserDeposit)
    private userDepositRepository: Repository<UserDeposit>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createDeposit(
    userDeposit: CreateUserDepositInput,
  ): Promise<UserDeposit> {
    const { deposit, depositImage, userId } = userDeposit;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const newUserDeposit = this.userDepositRepository.create({
      deposit,
      depositImage,
      userId,
    });

    return this.userDepositRepository.save(newUserDeposit);
  }

  findAll() {
    return this.userDepositRepository.find()
  }
}
