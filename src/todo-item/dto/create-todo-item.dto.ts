import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateTodoItemDto {
  @ApiProperty()
  @IsString()
  description: string;

  @IsString()
  @ApiProperty()
  priority: string;

  @ApiProperty()
  @IsNumber()
  todoListId: number;
}
