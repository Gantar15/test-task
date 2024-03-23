import { Task, TaskCreate, TaskRangeDTO, TaskUpdate } from "./task.type";

import { TaskResponseSchema } from "./task.schema";
import { apiService } from "@/shared/lib/api";

export async function createTask(task: TaskCreate) {
  const response = await apiService.post<Task>(
    process.env.API_URL + "/todos",
    task
  );
  await TaskResponseSchema.validate(response);
  return response;
}

export async function getTasks(skip: number, limit: number) {
  const response = await apiService.get<TaskRangeDTO>(
    process.env.API_URL + "/todos",
    {
      skip,
      limit,
    }
  );
  const { todos } = response;
  Promise.all(todos.map((t) => TaskResponseSchema.validate(t)));
  return todos;
}

export async function updateTask(id: number, task: TaskUpdate) {
  const response = await apiService.put<Task>(
    process.env.API_URL + "/todos/" + id,
    task
  );
  await TaskResponseSchema.validate(response);
  return response;
}

export async function deleteTask(id: number) {
  const response = await apiService.delete<Task>(
    process.env.API_URL + "/todos/" + id
  );
  await TaskResponseSchema.validate(response);
  return response;
}
