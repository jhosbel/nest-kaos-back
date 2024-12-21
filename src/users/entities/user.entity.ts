/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Bank } from 'src/banks/entities/bank.entity';
import { Game } from 'src/games/entities/game.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column({ type: 'float', default: 0 })
  @Field(() => Float, { nullable: true })
  crdBalance?: number;

  @Column({ type: 'float', default: 0 })
  @Field(() => Float, { nullable: true })
  usdBalance?: number;

  @ManyToMany(() => Game, (game) => game.user)
  @JoinTable()
  @Field(() => [Game], { nullable: true })
  games: Game[];

  @ManyToMany(() => Bank, (bank) => bank.user)
  @JoinTable()
  @Field(() => [Bank], { nullable: true })
  banks: Bank[];
}
