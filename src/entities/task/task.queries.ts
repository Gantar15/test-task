import { Task, TaskCreate, TaskRangeDTO, TaskUpdate } from "./task.type";
import { apiService, apiUrl } from "@/shared/lib/api";

import { TaskResponseSchema } from "./task.schema";

export async function createTask(task: TaskCreate) {
  const response = await apiService.post<Task>(apiUrl + "/todos", task);
  await TaskResponseSchema.validate(response);
  return response;
}

export async function getTasks(skip: number, limit: number) {
  const response = await apiService.get<TaskRangeDTO>(apiUrl + "/todos", {
    skip,
    limit,
  });
  const { todos } = response;
  Promise.all(todos.map((t) => TaskResponseSchema.validate(t)));
  return todos;
}

export async function updateTask(id: number, task: TaskUpdate) {
  const response = await apiService.put<Task>(apiUrl + "/todos/" + id, task);
  await TaskResponseSchema.validate(response);
  return response;
}

export async function deleteTask(id: number) {
  const response = await apiService.delete<Task>(apiUrl + "/todos/" + id);
  await TaskResponseSchema.validate(response);
  return response;
}