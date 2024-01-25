import { Body, Param, Query } from "@nestjs/common";
import { Controller, Get, Post, Put } from "src/core/decorators";
import BusinessLicenseService from "./todo.service";
import { CreateTodoRequestDTO, UpdateTodoRequestDTO } from "./dto/request";
import {
  CreateTodoResponseDTO,
  GetTodosResponseDTO,
  UpdateTodoResponseDTO,
} from "./dto/response";
import TodoService from "./todo.service";

@Controller({
  group: "Todo",
  path: "/todo",
  version: "1",
})
export default class TodoController {
  constructor(private _todoService: TodoService) {}

  @Get({
    path: "/",
    description: "Get all todos",
    model: GetTodosResponseDTO,
  })
  getTodos() {
    return this._todoService.getTodos();
  }

  @Post({
    path: "/",
    description: "Create a new todo",
    model: CreateTodoResponseDTO,
  })
  createTodo(@Body() data: CreateTodoRequestDTO) {
    return this._todoService.createTodo(data);
  }

  @Put({
    path: "/:id",
    description: "Update a todo's status",
    model: UpdateTodoResponseDTO,
  })
  updateTodo(@Body() data: UpdateTodoRequestDTO, @Param("id") id: number) {
    return this._todoService.updateTodo(id, data);
  }
}
