import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RemoteServersModule } from './remote-servers/remote-servers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: join(__dirname, '..', 'db.sqlite'),
      autoLoadEntities: true,
      synchronize: true, //process.env.DB_SYNCHRONIZE === 'true',
      // logging: true,
    }),
    UsersModule,
    RemoteServersModule,
    AuthModule,
  ],
})
export class AppModule {}
