/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateBankInput } from './dto/create-bank.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from './entities/bank.entity';
import { Repository } from 'typeorm';
//import { UpdateBankInput } from './dto/update-bank.input';

@Injectable()
export class BanksService {
  constructor(
    @InjectRepository(Bank) private bankRepository: Repository<Bank>,
  ) {}

  async createBank(createBankInput: CreateBankInput): Promise<Bank> {
    const existingBank = await this.bankRepository.findOne({
      where: { name: createBankInput.name },
    });
    if (existingBank) throw new Error('Banco ya existe');
    const newBank = this.bankRepository.create(createBankInput);
    return this.bankRepository.save(newBank);
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
