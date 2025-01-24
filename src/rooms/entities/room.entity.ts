/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoomStatus } from '../enums/room-status.enum';
import { IsEnum } from 'class-validator';
import { UserStats } from './users-stats';

registerEnumType(RoomStatus, {
  name: 'RoomStatus',
});

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
  gameName: string;

  @Column()
  @Field()
  roomGameId: string;

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

  @Column({
    type: 'varchar',
    default: 'new',
  })
  @IsEnum(RoomStatus)
  @Field(() => String)
  status: RoomStatus;

  @Column('simple-json', { nullable: true })
  @Field(() => [UserStats], { nullable: true })
  userStats?: UserStats[];
}
