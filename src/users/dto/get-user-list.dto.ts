/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,

} from 'class-validator';
import { GetTodoListItemDto } from 'src/todo-list/dto/get-todo-list-item.dto';
export class GetUserListDto {
  @ApiProperty()
  @IsAlphanumeric()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  todoList: GetTodoListItemDto[];
}
