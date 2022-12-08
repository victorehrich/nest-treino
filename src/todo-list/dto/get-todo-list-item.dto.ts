import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsString } from 'class-validator';
import { TodoItem } from 'src/todo-item/entities/todo-item.entity';

export class GetTodoListItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsISO8601()
  created_at: Date;

  @ApiProperty()
  @IsISO8601()
  updated_at: Date;

  @ApiProperty()
  todoItem: TodoItem[];

}
