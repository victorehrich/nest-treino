import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TodoItemService } from './todo-item.service';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt.auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('TodoItemController')
@UseGuards(JwtAuthGuard)
@Controller('todo-item')
export class TodoItemController {
  constructor(private readonly todoItemService: TodoItemService) {}

  @Post()
  create(@Req() request, @Body() createTodoItemDto: CreateTodoItemDto) {
    return this.todoItemService.create(request.user.userId, createTodoItemDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoItemService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoItemDto: UpdateTodoItemDto,
  ) {
    return this.todoItemService.update(+id, updateTodoItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoItemService.remove(+id);
  }
}
