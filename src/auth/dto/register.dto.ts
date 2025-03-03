/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(4)
  name: string;

  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  phone: string;
}
