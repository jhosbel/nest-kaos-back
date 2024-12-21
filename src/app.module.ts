/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GamesModule } from './games/games.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BanksModule } from './banks/banks.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GamesModule,
    UsersModule,
    BanksModule,
    RoomsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
