import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { TodoList } from './entities/todo-list.entity';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoList)
    private todoListRepository: Repository<TodoList>,
    private usersService: UsersService,
  ) {}
  async create(
    userId: number,
    createTodoListDto: CreateTodoListDto,
  ): Promise<TodoList> {
    const user = await this.usersService.findById(userId);
    const newTodoList = { user: user, ...createTodoListDto };
    return await this.todoListRepository.save(newTodoList);
  }

  async findAll(userId: number) {
    const user = await this.usersService.findById(userId);
    return await this.todoListRepository.find({ where: [{ user: user }] });
  }

  async findOne(userId: number, id: number) {
    const user = await this.usersService.findById(userId);
    return await this.todoListRepository.findOne({
      where: [{ user: user }, { id: id }],
    });
  }

  update(id: number, updateTodoListDto: UpdateTodoListDto) {
    return `This action updates a #${id} todoList`;
  }

  remove(id: number) {
    return `This action removes a #${id} todoList`;
  }
}
