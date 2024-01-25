import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { TodoStatus } from "../todo.entity";

export class CreateTodoRequestDTO {
  @ApiProperty()
  @IsString()
  title: string;
}

export class UpdateTodoRequestDTO {
  @ApiProperty({
    enum: TodoStatus,
  })
  @IsEnum(TodoStatus)
  status: TodoStatus;
}
