/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { UserBank } from 'src/user-banks/entities/user-bank.entity';
import { UserGame } from 'src/user-games/entities/user-game.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enum/role';
import { UserDeposit } from 'src/users-deposits/entities/user-deposit.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true, default: '' })
  @Field()
  avatar?: string;

  @Column({ unique: true, nullable: false })
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field()
  password: string;

  @Column({ nullable: true, default: '' })
  @Field()
  phone?: string;

  @Column({
    type: 'text',
    default: Role.USER,
  })
  @Field()
  rol: Role;

  @Column({ type: 'float', default: 0 })
  @Field(() => Float, { nullable: true })
  crdBalance?: number;

  @Column({ type: 'float', default: 0 })
  @Field(() => Float, { nullable: true })
  usdBalance?: number;

  @OneToMany(() => UserGame, (userGame) => userGame.user)
  @Field(() => [UserGame], { nullable: true })
  userGameDetails?: UserGame[];

  @OneToMany(() => UserBank, (userBanks) => userBanks.user)
  @Field(() => [UserBank], { nullable: true })
  banks?: UserBank[];

  @OneToMany(() => UserDeposit, (userDeposit) => userDeposit.user)
  @Field(() => [UserDeposit], { nullable: true })
  deposits?: UserDeposit[];
}
