/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany,/*  OneToMany, */ PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({nullable: true})
  @Field(() => Int)
  userId?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  gameUserId?: string; // ID del usuario dentro del juego

  @Column({ nullable: true })
  @Field({ nullable: true })
  nickname?: string; // Nickname dentro del juego

  @ManyToMany(() => User, (user) => user.games)
  @Field(() => [User])
  user?: User[];
}
