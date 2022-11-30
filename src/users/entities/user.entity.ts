/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { TodoList } from 'src/todo-list/entities/todo-list.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column({ unique: true })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => TodoList, (todoList) => todoList.user)
  todoList: TodoList[];
}
