import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsString } from 'class-validator';

export class UpdateTodoListDto {
  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsISO8601()
  updated_at: Date;
}
