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
  findOne(@Req() request, @Param('id') id: string) {
    return this.todoItemService.findOne(request.user.userId, +id);
  }

  @Patch(':id')
  update(
    @Req() request,
    @Param('id') id: string,
    @Body() updateTodoItemDto: UpdateTodoItemDto,
  ) {
    return this.todoItemService.update(
      request.user.userId,
      +id,
      updateTodoItemDto,
    );
  }

  @Delete(':id')
  remove(@Req() request, @Param('id') id: string) {
    return this.todoItemService.remove(request.user.userId, +id);
  }
}
