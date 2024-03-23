import * as yup from "yup";

import {
  CreateTaskSchema,
  TaskResponseSchema,
  UpdateTaskSchema
} from "./task.schema";

export type Task = Required<yup.InferType<typeof TaskResponseSchema>>;

export type TaskCreate = Required<yup.InferType<typeof CreateTaskSchema>>;

export type TaskUpdate = Required<yup.InferType<typeof UpdateTaskSchema>>;

export type TaskUpdateDto = Partial<Omit<Task, "id">>;

export type TaskCreateDto = Partial<Omit<Task, "id">>;

export type TaskRangeDto = {
  skip: number;
  take: number;
  total: number;
  todos: Task[];
};
