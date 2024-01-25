import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import TodoController from "./todo.controller";
import TodoEntity from "./todo.entity";
import TodoService from "./todo.service";

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  exports: [TodoService],
  providers: [TodoService],
  controllers: [TodoController],
})
export default class TodoModule {}
