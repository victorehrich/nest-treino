import { ApiProperty } from '@nestjs/swagger';
import { TodoList } from 'src/todo-list/entities/todo-list.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TodoItem {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column()
  description: string;

  @Column({ default: true })
  priority: string;

  @ManyToOne(() => TodoList, (todoList) => todoList.todoItem, { eager: true })
  todoList: TodoList;
}
