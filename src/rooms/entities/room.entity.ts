/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Room {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  gameId: number;

  @Column()
  @Field()
  roomId: string;

  @Column()
  @Field()
  roomPassword: string;

  @Column()
  @Field(() => Int, { defaultValue: 0 })
  playersNum: number;

  @Column()
  @Field()
  mode: string;

  @Column()
  @Field()
  time: string;

  @Column()
  @Field()
  date: string;

  @Column('simple-array')
  @Field(() => [Int], { nullable: true })
  usersId?: number[];
}
