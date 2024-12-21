/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateBankInput } from './dto/create-bank.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from './entities/bank.entity';
import { Repository } from 'typeorm';
import { AssignBankInput } from './dto/addUser-bank.input';
//import { UpdateBankInput } from './dto/update-bank.input';

@Injectable()
export class BanksService {
  constructor(
    @InjectRepository(Bank) private bankRepository: Repository<Bank>,
  ) {}

  create(createBankInput: CreateBankInput): Promise<Bank> {
    const newBank = this.bankRepository.create(createBankInput);
    return this.bankRepository.save(newBank);
  }

  async assignBankToUser(assignGameInput: AssignBankInput): Promise<Bank> {
    const { bankId, userId, bankCode, binancePayId, userBankPhone, userDniBank } = assignGameInput;

    const bank = await this.bankRepository.findOneBy({ id: bankId });
    if (!bank) {
      throw new Error('Bank not found');
    }

    bank.userId = userId;
    if (binancePayId) {
      bank.binancePayId = binancePayId;
    }
    if (bankCode) {
      bank.bankCode = bankCode;
    }
    if (userBankPhone) {
      bank.userBankPhone = userBankPhone;
    }
    if (userDniBank) {
      bank.userDniBank = userDniBank;
    }

    return this.bankRepository.save(bank);
  }

  findAllBanks(): Promise<Bank[]> {
    return this.bankRepository.find();
  }

  findOneBankById(id: number): Promise<Bank> {
    return this.bankRepository.findOne({ where: { id } });
  }

  /* update(id: number, updateBankInput: UpdateBankInput) {
    return `This action updates a #${id} bank`;
  }

  remove(id: number) {
    return `This action removes a #${id} bank`;
  } */
}
