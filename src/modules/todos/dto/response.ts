import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TodoResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class GetTodosResponseDTO {
  @ApiProperty({
    isArray: true,
    type: TodoResponse,
  })
  todos: TodoResponse[];
}

export class CreateTodoResponseDTO {
  @ApiProperty()
  todo: TodoResponse;
}

export class UpdateTodoResponseDTO {
  @ApiProperty()
  todo: TodoResponse;
}
