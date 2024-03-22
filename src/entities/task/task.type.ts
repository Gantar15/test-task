import * as yup from "yup";

import { TaskResponseSchema } from "./task.schema";

export type Task = Required<yup.InferType<typeof TaskResponseSchema>>;

export type TaskUpdate = Partial<Omit<Task, "id">>;

export type TaskCreate = Omit<Task, "id">;

export type TaskRangeDTO = {
  skip: number;
  take: number;
  total: number;
  todos: Task[];
};
