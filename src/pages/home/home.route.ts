import { taskConfig, taskStore } from "@/entities/task";

import { HomePage } from "./HomePage";
import { RouteObject } from "react-router-dom";
import { createElement } from "react";
import { pathKeys } from "@/shared/lib/router";

export const homePageRoute: RouteObject = {
  path: pathKeys.home(),
  element: createElement(HomePage),
  loader: (...args) => {
    const todoState = taskStore.useTaskStore.getState();
    if (todoState.tasks.length === 0) {
      todoState.resetTodos();
      todoState.getRange(0, taskConfig.tasksfetchRangeCount);
    }

    return args;
  }
};
