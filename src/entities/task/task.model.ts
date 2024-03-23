import { DevtoolsOptions, devtools, persist } from "zustand/middleware";
import type { Task, TaskCreateDto, TaskUpdateDto } from "./task.type";
import { createTask, deleteTask, getTasks, updateTask } from "./task.queries";

import { StateCreator } from "zustand";
import { createWithEqualityFn } from "zustand/traditional";
import { immer } from "zustand/middleware/immer";
import { shallow } from "zustand/shallow";
import { tasksfetchRangeCount } from "./task.config";

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
  create: (task: TaskCreateDto) => void;
  update: (id: number, task: TaskUpdateDto) => void;
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
    create: async (task: TaskCreateDto) => {
      set({
        isTaskCreating: true,
        taskCreateError: null
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

    update: async (id: number, task: TaskUpdateDto) => {
      set({
        isTaskUpdating: true,
        taskUpdateError: null
      });

      try {
        const response = await updateTask(id, task);
        set((state) => {
          // const taskIndex = state.tasks.findIndex((t) => t.id === response.id);
          // state.tasks[taskIndex] = response;
          state.isTaskUpdating = false;
          state.taskUpdateError = null;
        });
      } catch (err) {
        set((state) => {
          state.isTaskUpdating = false;
          state.taskUpdateError = err.message;
        });
      }
      //#region This is a crutch. This is so because the api does not actually update the data
      set((state) => {
        const taskIndex = state.tasks.findIndex((t) => t.id === id);
        const updatingTask = state.tasks[taskIndex];
        updatingTask.completed =
          task.completed !== undefined
            ? task.completed
            : updatingTask.completed;
        updatingTask.todo =
          task.todo !== undefined ? task.todo : updatingTask.todo;
        updatingTask.userId =
          task.userId !== undefined ? task.userId : updatingTask.userId;
      });
      //#endregion
    },

    delete: async (id: number) => {
      set({
        isTaskDeleting: true,
        taskDeleteError: null
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
          //#region This is a crutch. This is so because the api does not actually update the data
          const taskIndex = state.tasks.findIndex((t) => t.id === id);
          state.tasks.splice(taskIndex, 1);
          //#endregion

          state.isTaskDeleting = false;
          state.taskDeleteError = err.message;
        });
      }
    },

    getRange: async (skip: number, take: number) => {
      set({
        isTasksLoading: true,
        tasksError: null
      });

      try {
        const response = await getTasks(skip, take);
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
    }
  });

const initialTasksState: State = {
  tasks: [],
  isTasksLoading: false,
  tasksError: null,

  isTaskUpdating: false,
  taskUpdateError: null,

  isTaskDeleting: false,
  taskDeleteError: null,

  isTaskCreating: false,
  taskCreateError: null
};

const devtoolsOptions: DevtoolsOptions = {
  name: "HomePage TasksStore",
  enabled: process.env.NODE_ENV !== "production"
};

export const useTaskStore = createWithEqualityFn<TaskState>()(
  persist(
    devtools(immer(createTaskSlice(initialTasksState)), devtoolsOptions),
    {
      name: "HomePage TasksStore",
      merge: (persistedState: State, currentState) => {
        return {
          ...currentState,
          ...persistedState,
          tasks: persistedState.tasks.slice(0, tasksfetchRangeCount)
        };
      }
    }
  ),
  shallow
);
