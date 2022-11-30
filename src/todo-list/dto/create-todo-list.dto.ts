import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsString } from 'class-validator';

export class CreateTodoListDto {
  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsISO8601()
  created_at: Date;
}
