/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDepositInput } from './dto/create-user-deposit.input';
import { UserDeposit } from './entities/user-deposit.entity';
import { Role } from './enum/role';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UserDepositService {
  constructor(
    @InjectRepository(UserDeposit)
    private userDepositRepository: Repository<UserDeposit>,
    private cloudinaryService: CloudinaryService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createDeposit(
    userDeposit: CreateUserDepositInput,
  ): Promise<UserDeposit> {
    const { deposit, depositImage, userId } = userDeposit;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    let imageUrl = depositImage;
    if (depositImage && depositImage.startsWith('data:image')) {
      imageUrl = await this.cloudinaryService.uploadFile(depositImage);
    }

    const newUserDeposit = this.userDepositRepository.create({
      deposit,
      depositImage: imageUrl,
      userId,
    });

    return this.userDepositRepository.save(newUserDeposit);
  }

  findAll() {
    return this.userDepositRepository.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.userDepositRepository.findOne({
      where: { id },
      relations: ['user'],
    });
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
