import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateTodoItemDto {
  @ApiProperty()
  @IsString()
  description: string;

  @IsString()
  @ApiProperty()
  priority: string;

  @IsBoolean()
  @ApiProperty()
  done: boolean;
}
