import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: join(__dirname, '..', 'db.sqlite'),
      autoLoadEntities: true,
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      // logging: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
