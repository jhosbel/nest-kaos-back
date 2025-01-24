/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserGame } from 'src/user-games/entities/user-game.entity';
import { Role } from './enum/role';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(createUserInput);
    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['userGameDetails', 'banks'],
    });
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['userGameDetails', 'banks'],
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['userGameDetails', 'banks'],
    });
  }

  async findOneUserGames(id: number): Promise<UserGame[]> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['userGameDetails'],
    });
    return user.userGameDetails;
  }

  async updateUserRole(id: number, newRole: Role): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    user.rol = newRole;
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    const updateUser = Object.assign(user, updateUserInput);
    return this.userRepository.save(updateUser);
  }

  async removeUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new Error('User not found');
    return this.userRepository.remove(user);
  }
}
