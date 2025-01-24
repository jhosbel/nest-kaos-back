/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserBankInput } from './dto/create-user-bank.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBank } from './entities/user-bank.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Bank } from 'src/banks/entities/bank.entity';
//import { UpdateUserBankInput } from './dto/update-user-bank.input';

@Injectable()
export class UserBanksService {
  constructor(
    @InjectRepository(UserBank)
    private userBankRepository: Repository<UserBank>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Bank) private bankRepository: Repository<Bank>,
  ) {}

  async assignBankToUser(
    assignGameInput: CreateUserBankInput,
  ) {
    const {
      bankCode,
      binancePayId,
      userBankPhone,
      userDniBank,
      userId,
      bankId,
    } = assignGameInput;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const bank = await this.bankRepository.findOne({ where: { id: bankId } });
    if (!bank) {
      throw new Error('Bank not found');
    }

    if (!bank.name) {
      throw new Error('Bank name is missing');
    }

    const existingUserBank = await this.userBankRepository.findOne({
      where: { userId, bankId },
    });
    
    if (existingUserBank) throw new Error('You already have the bank');
    
    const newUserBank = this.userBankRepository.create({
      bankName: bank.name,
      userId: userId,
      bankId: bankId,
      binancePayId,
      bankCode,
      userDniBank,
      userBankPhone,
    });
    
    return this.userBankRepository.save(newUserBank);
  }

  findAll() {
    return this.bankRepository.find({ relations: ['banks'] })
  }

  findOne(id: number) {
    return this.bankRepository.findOne({
      where: { id },
      relations: ['banks']
    })
  }

  /* update(id: number, updateUserBankInput: UpdateUserBankInput) {
    return `This action updates a #${id} userBank`;
  }

  remove(id: number) {
    return `This action removes a #${id} userBank`;
  } */
}
