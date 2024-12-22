/* eslint-disable prettier/prettier */
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from './game.entity';

@Entity()
@ObjectType()
export class UserGame {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  userId: number

  @Column()
  @Field(() => Int)
  gameId: number

  @Column()
  @Field()
  gameUserId: string;

  @Column()
  @Field()
  nickname: string;

  @OneToOne(() => Game, (game) => game.id)
  @Field(() => Game)
  game: Game;
}
