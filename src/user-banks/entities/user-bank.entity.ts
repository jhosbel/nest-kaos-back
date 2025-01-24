/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class UserBank {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  bankId: number;
  
  @Column()
  @Field(() => Int)
  userId: number;

  @Column()
  @Field()
  bankName: string;

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

  @ManyToOne(() => User, (user) => user.banks)
  @Field(() => User)
  user: User;
}
