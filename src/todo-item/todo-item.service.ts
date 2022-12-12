import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoListService } from 'src/todo-list/todo-list.service';
import { Repository } from 'typeorm';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { TodoItem } from './entities/todo-item.entity';

@Injectable()
export class TodoItemService {
  constructor(
    @InjectRepository(TodoItem)
    private todoItemRepository: Repository<TodoItem>,
    private todoListService: TodoListService,
  ) {}
  async create(userId: number, createTodoItemDto: CreateTodoItemDto) {
    const todoLists = await this.todoListService.findAll(userId);
    const listExist = todoLists.find(
      (list) => list.id == createTodoItemDto.todoListId,
    );
    if (!!listExist) {
      const todoItem = { todoList: listExist, ...createTodoItemDto };
      return await this.todoItemRepository.save(todoItem);
    }
    throw new Error('Lista nâo encontradaa');
  }

  async findOne(userId: number, id: number) {
    const todoList = await this.todoItemRepository
      .createQueryBuilder('todoItem')
      .innerJoinAndSelect('todoItem.todoList', 'todoList')
      .innerJoin('todoList.user', 'user')
      .where('user.id = :userId', { userId: userId })
      .andWhere('todoItem.id = :todoItemId', { todoItemId: id })
      .getOne();
    return todoList;
  }

  async update(
    userId: number,
    id: number,
    updateTodoItemDto: UpdateTodoItemDto,
  ) {
    const todoItem = await this.findOne(userId, id);
    return await this.todoItemRepository.save({
      ...todoItem,
      ...updateTodoItemDto,
    });
  }

  async remove(userId: number, id: number) {
    const todoItem = await this.findOne(userId, id);
    return await this.todoItemRepository.remove(todoItem);
  }
}
