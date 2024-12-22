/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToMany,OneToOne,/*  OneToMany, */ PrimaryGeneratedColumn } from 'typeorm';
import { UserGame } from './userGame.entity';

@Entity()
@ObjectType()
export class Game {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  avatar?: string;

  @ManyToMany(() => User, (user) => user.games)
  @Field(() => [User])
  user?: User[];

  @OneToOne(() => UserGame)
  @JoinColumn()
  @Field({ nullable: true })
  userGameDetail?: UserGame

}
