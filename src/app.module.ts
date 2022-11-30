import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './db/ormConfig';
import { AuthModule } from './auth/auth.module';
import { CryptographyModule } from './cryptography/cryptography.module';
import { TodoListModule } from './todo-list/todo-list.module';
import { TodoItemModule } from './todo-item/todo-item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    AuthModule,
    CryptographyModule,
    TodoListModule,
    TodoItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
