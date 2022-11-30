import { Module } from '@nestjs/common';
import { TodoItemService } from './todo-item.service';
import { TodoItemController } from './todo-item.controller';

@Module({
  controllers: [TodoItemController],
  providers: [TodoItemService],
})
export class TodoItemModule {}
