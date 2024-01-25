import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DateTime } from "luxon";
import { NotFoundException } from "src/core/exceptions";
import { In, Repository } from "typeorm";
import TodoEntity, { TodoStatus } from "./todo.entity";
import { CreateTodoRequestDTO, UpdateTodoRequestDTO } from "./dto/request";
import {
  CreateTodoResponseDTO,
  GetTodosResponseDTO,
  UpdateTodoResponseDTO,
} from "./dto/response";

@Injectable()
export default class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private _todoRepository: Repository<TodoEntity>
  ) {}

  async getTodos(): Promise<GetTodosResponseDTO> {
    const todos = await this._todoRepository.find();
    return { todos };
  }

  async createTodo(
    data: CreateTodoRequestDTO
  ): Promise<CreateTodoResponseDTO> {
    const todo = new TodoEntity();
    todo.title = data.title;
    todo.status = TodoStatus.TODO;
    await this._todoRepository.save(todo);
    return { todo };
  }

  async updateTodo(
    id: number,
    data: UpdateTodoRequestDTO
  ): Promise<UpdateTodoResponseDTO> {
    const todo = await this._todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException("Todo not found");
    }
    todo.status = data.status;
    await this._todoRepository.save(todo);
    return { todo };
  }
}
