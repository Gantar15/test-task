import { DevtoolsOptions, devtools } from "zustand/middleware";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { taskStore } from "@/entities/task";

const initialTasksState: taskStore.State = {
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

export const useTaskStore = create<taskStore.TaskState>()(
  devtools(immer(taskStore.createTaskSlice(initialTasksState)), devtoolsOptions)
);
