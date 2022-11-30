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
import { TodoListService } from './todo-list.service';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { JwtAuthGuard } from 'src/auth/strategies/jwt.auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TodoList } from './entities/todo-list.entity';

@ApiBearerAuth()
@ApiTags('TodoListController')
@UseGuards(JwtAuthGuard)
@Controller('todo-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Post()
  create(
    @Req() request,
    @Body() createTodoListDto: CreateTodoListDto,
  ): Promise<TodoList> {
    return this.todoListService.create(request.user.userId, createTodoListDto);
  }

  @Get()
  findAll(@Req() request) {
    return this.todoListService.findAll(request.user.userId);
  }

  @Get(':id')
  findOne(@Req() request, @Param('id') id: string) {
    return this.todoListService.findOne(request.user.userId, +id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodoListDto,
  ) {
    return this.todoListService.update(+id, updateTodoListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoListService.remove(+id);
  }
}
