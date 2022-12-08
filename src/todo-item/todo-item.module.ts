import { Module } from '@nestjs/common';
import { TodoItemService } from './todo-item.service';
import { TodoItemController } from './todo-item.controller';
import { TodoItem } from './entities/todo-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from 'src/todo-list/entities/todo-list.entity';
import { TodoListService } from 'src/todo-list/todo-list.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CryptographyService } from 'src/cryptography/cryptography.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItem, TodoList, User])],
  controllers: [TodoItemController],
  providers: [
    TodoItemService,
    TodoListService,
    UsersService,
    CryptographyService,
  ],
})
export class TodoItemModule {}
