/* eslint-disable prettier/prettier */
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enum/role';

@Entity()
@ObjectType()
export class UserDeposit {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  deposit?: string;

  @Column()
  @Field()
  depositImage?: string;

  @Column()
  @Field(() => Int)
  userId: number;

  @Column({
    type: 'text',
    default: Role.PENDING,
  })
  @Field()
  rol: Role;

  @ManyToOne(() => User, (user) => user.deposits)
  @Field(() => User)
  user: User;
}
