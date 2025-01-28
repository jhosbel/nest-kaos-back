/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDepositInput } from './dto/create-user-deposit.input';
import { UserDeposit } from './entities/user-deposit.entity';
import { Role } from './enum/role';

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
    return this.userDepositRepository.find();
  }

  findOne(id: number) {
    return this.userDepositRepository.findOne({ where: { id } });
  }

  async updateUserRole(id: number, newRole: Role): Promise<UserDeposit> {
    const userDeposit = await this.userDepositRepository.findOne({
      where: { id },
    });
    if (!userDeposit) {
      throw new Error('User not found');
    }
    userDeposit.rol = newRole;
    return this.userDepositRepository.save(userDeposit);
  }
}
