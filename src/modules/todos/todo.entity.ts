import BaseEntity from "src/core/entity/base.entity";
import { Column, Entity, Index } from "typeorm";

export enum TodoStatus {
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  COMPLETE = "Complete",
}

@Entity("todos")
export default class TodoEntity extends BaseEntity {
  @Column({
    name: "title",
  })
  @Index()
  title: string;

  @Column({
    name: "status",
    type: "enum",
    enum: TodoStatus,
  })
  status: TodoStatus;
}
