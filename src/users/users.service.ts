import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptographyService } from 'src/cryptography/cryptography.service';
import { TodoItem } from 'src/todo-item/entities/todo-item.entity';
import { TodoList } from 'src/todo-list/entities/todo-list.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserListDto } from './dto/get-user-list.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(TodoList)
    private todoListRepository: Repository<TodoList>,
    @InjectRepository(TodoItem)
    private todoItemRepository: Repository<TodoItem>,

    private cryptographyService: CryptographyService,
  ) {}
  async findAll(name?: string): Promise<User[]> {
    return !!name
      ? await this.userRepository.findBy({ name: name })
      : await this.userRepository.find();
  }
  async findById(userId: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!!user) return user;
    else throw new Error('Usuário nâo encontrado');
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = this.cryptographyService.encryptAESfunction(
      createUserDto.password,
    );
    const newUser = { ...createUserDto };
    return await this.userRepository.save(newUser);
  }
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    return await this.userRepository.save({ ...user, ...updateUserDto });
  }
  async removeUser(id: number): Promise<User> {
    const user = await this.findById(id);
    const removeUser = user;
    removeUser.isActive = false;
    return await this.userRepository.save({ ...user, ...removeUser });
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!!user) return user;
    else throw new Error('Usuário nâo encontrado');
  }
  async getAllUserList(userId: number): Promise<GetUserListDto> {
    const user = await this.findById(+userId);

    const todoList = await this.todoListRepository.find({
      where: [{ user: user }],
    });

    const newTodo: TodoList[] = await Promise.all(
      todoList.map(async (list) => {
        const todoItem = await this.todoItemRepository.findBy(list.todoItem);
        list.todoItem = [];
        todoItem.forEach((item) => {
          if (list.id == item.todoList.id) list.todoItem.push(item);
          delete item.todoList;
        });
        delete list.user;

        return list;
      }),
    );

    user.todoList = newTodo;
    delete user.password;

    return user;
  }
}
