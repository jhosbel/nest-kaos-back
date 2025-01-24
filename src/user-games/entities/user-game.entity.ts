/* eslint-disable prettier/prettier */
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
@ObjectType()
export class UserGame {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  gameName: string;

  @Column()
  @Field(() => Int)
  userId: number;

  @Column()
  @Field(() => Int)
  gameId: number;

  @Column()
  @Field()
  gameUserId: string;

  @Column()
  @Field()
  nickname: string;

  @Column()
  @Field()
  gameAvatar: string;

  @ManyToOne(() => User, (user) => user.userGameDetails)
  @Field(() => User)
  user: User;
}

