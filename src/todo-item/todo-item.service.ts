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

  async findOne(id: number) {
    return await this.todoItemRepository.findOneBy({ id: id });
  }

  async update(id: number, updateTodoItemDto: UpdateTodoItemDto) {
    const todoItem = await this.findOne(id);
    return await this.todoItemRepository.save({
      ...todoItem,
      ...updateTodoItemDto,
    });
  }

  async remove(id: number) {
    const todoItem = await this.findOne(id);
    return await this.todoItemRepository.remove(todoItem);
  }
}
