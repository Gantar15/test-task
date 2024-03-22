import { StateCreator } from "zustand";
import { TaskCreate, type Task, TaskUpdate } from "./task.type";
import { createTask, deleteTask, getTasks, updateTask } from "./task.queries";

export type State = {
  tasks: Task[];
  isTasksLoading: boolean;
  tasksError: string | null;

  isTaskUpdating: boolean;
  taskUpdateError: string | null;

  isTaskDeleting: boolean;
  taskDeleteError: string | null;

  isTaskCreating: boolean;
  taskCreateError: string | null;
};

export type Actions = {
  create: (task: Task) => void;
  update: (id: number, task: Task) => void;
  delete: (id: number) => void;
  getRange: (skip: number, take: number) => void;
};

export type TaskState = State & Actions;
export const createTaskSlice =
  (
    initialState: State
  ): StateCreator<
    TaskState,
    [["zustand/immer", never]],
    [["zustand/devtools", ""]],
    TaskState
  > =>
  (set) => ({
    ...initialState,
    create: async (task: TaskCreate) => {
      set({
        isTaskCreating: true,
        taskCreateError: null,
      });

      try {
        const response = await createTask(task);
        set((state) => {
          state.tasks.unshift(response);
          state.isTaskCreating = false;
          state.taskCreateError = null;
        });
      } catch (err) {
        set((state) => {
          state.isTaskCreating = false;
          state.taskCreateError = err.message;
        });
      }
    },
    update: async (id: number, task: TaskUpdate) => {
      set({
        isTaskUpdating: true,
        taskUpdateError: null,
      });

      try {
        const response = await updateTask(id, task);
        set((state) => {
          const taskIndex = state.tasks.findIndex((t) => t.id === response.id);
          state.tasks[taskIndex] = response;
          state.isTaskUpdating = false;
          state.taskUpdateError = null;
        });
      } catch (err) {
        set((state) => {
          state.isTaskUpdating = false;
          state.taskUpdateError = err.message;
        });
      }
    },
    delete: async (id: number) => {
      set({
        isTaskDeleting: true,
        taskDeleteError: null,
      });

      try {
        const response = await deleteTask(id);
        set((state) => {
          const taskIndex = state.tasks.findIndex((t) => t.id === response.id);
          state.tasks.splice(taskIndex, 1);
          state.isTaskDeleting = false;
          state.taskDeleteError = null;
        });
      } catch (err) {
        set((state) => {
          state.isTaskDeleting = false;
          state.taskDeleteError = err.message;
        });
      }
    },
    getRange: async (skip: number, take: number) => {
      set({
        isTasksLoading: true,
        tasksError: null,
      });

      try {
        const response = await getTasks(skip, take);
        console.log(response);
        set((state) => {
          state.tasks.push(...response);
          state.isTasksLoading = false;
          state.tasksError = null;
        });
      } catch (err) {
        set((state) => {
          state.isTasksLoading = false;
          state.tasksError = err.message;
        });
      }
    },
  });
