/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/changePassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ name, email, password, phone }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('Usuario ya existe');
    }
    return await this.userService.create({
      name,
      email,
      password: await bcryptjs.hash(password, 10),
      phone,
    });
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email no es correcto');
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
    const payload = { email: user.email, userId: user.id };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
      email,
    };
  }

  async changePassword({ email, oldPassword, newPassword }: ChangePasswordDto) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('Email no es correcto');
    const isPasswordValid = await bcryptjs.compare(oldPassword, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Contraseña actual incorrecta');
    const hashedNewPassword = await bcryptjs.hash(newPassword, 10);
    await this.userService.updatePassword(user.id, hashedNewPassword);
    return { message: 'Contraseña actualizada correctamente' };
  }
}
