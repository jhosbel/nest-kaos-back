/* eslint-disable prettier/prettier */
import { InputType, Field } from '@nestjs/graphql';
import { /* IsInt, */ IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateGameInput {
  @MinLength(5, {
    message: 'El titulo es demaciado corto',
  })
  @IsNotEmpty()
  @Field()
  name: string;

  @Field()
  avatar: string;

  @Field({ nullable: true })
  gameUserId?: string;

  @Field({ nullable: true })
  nickname?: string;
}
