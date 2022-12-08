import { ApiProperty } from '@nestjs/swagger';
import { TodoItem } from 'src/todo-item/entities/todo-item.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TodoList {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column()
  status: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.todoList, { eager: true })
  user: User;

  @OneToMany(() => TodoItem, (TodoItem) => TodoItem.todoList)
  todoItem: TodoItem[];
}
