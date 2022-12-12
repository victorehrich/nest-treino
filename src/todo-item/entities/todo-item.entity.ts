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

  @Column()
  priority: string;

  @Column({ default: false })
  done: boolean;

  @ManyToOne(() => TodoList, (todoList) => todoList.todoItem, {
    eager: true,
    onDelete: 'CASCADE',
  })
  todoList: TodoList;
}
