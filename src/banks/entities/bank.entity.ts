/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Bank {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field(() => Int)
  userId?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  userBankPhone?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  bankCode?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  userDniBank?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  binancePayId?: string;

  @ManyToMany(() => User, (user) => user.banks)
  @Field(() => User)
  user?: User;
}
