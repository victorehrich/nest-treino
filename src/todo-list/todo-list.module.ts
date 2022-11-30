import { Module } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { TodoListController } from './todo-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './entities/todo-list.entity';
import { UsersService } from 'src/users/users.service';
import { CryptographyService } from 'src/cryptography/cryptography.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, TodoList])],
  controllers: [TodoListController],
  providers: [TodoListService, UsersService, CryptographyService],
})
export class TodoListModule {}
