import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptographyService } from 'src/cryptography/cryptography.service';
import { TodoItem } from 'src/todo-item/entities/todo-item.entity';
import { TodoList } from 'src/todo-list/entities/todo-list.entity';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, TodoList, TodoItem])],
  controllers: [UsersController],
  providers: [UsersService, CryptographyService],
  exports: [UsersService],
})
export class UsersModule {}
