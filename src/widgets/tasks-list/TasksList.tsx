import { DeleteTask, TaskCompletedCheckbox } from "@/features/task";
import { HStack, Stack, Text } from "@chakra-ui/react";
import { taskStore, taskType } from "@/entities/task";
import { useEffect, useState } from "react";

import CheckMarkIcon from "@/shared/assets/icons/check-mark.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";
import EditIcon from "@/shared/assets/icons/edit.svg";
import { GetUpdate } from "@/features/task";
import { Loader } from "@/shared/ui/Loader";
import { withSuspense } from "@/shared/lib/react";

const List = () => {
  const { tasks, isTasksLoading } = taskStore.useTaskStore((state) => ({
    tasks: state.tasks,
    isTasksLoading: state.isTasksLoading
  }));
  return (
    <Stack spacing={3}>
      {isTasksLoading && <Loader />}
      {!isTasksLoading &&
        tasks.map((task) => <Task key={task.id} task={task} />)}
    </Stack>
  );
};

interface TaskProps {
  task: taskType.Task;
}
const Task = ({ task }: TaskProps) => {
  const [isTaskEditingMode, setIsTaskEditingMode] = useState(false);
  const [isTaskUpdateClicked, setIsTaskUpdateClicked] = useState(false);
  const [todo, setTodo] = useState(task.todo);
  const [todoError, setTodoError] = useState<string | null>(null);
  const { updateTask, isUpdating } = taskStore.useTaskStore((state) => ({
    updateTask: state.update,
    isUpdating: state.isTaskUpdating
  }));

  useEffect(() => {
    if (!isUpdating && isTaskEditingMode && isTaskUpdateClicked) {
      setIsTaskUpdateClicked(false);
      setIsTaskEditingMode(false);
    }
  }, [isUpdating]);

  const editClickHandler = () => {
    setIsTaskEditingMode(true);
  };

  const exitEditClickHandler = () => {
    setIsTaskEditingMode(false);
  };

  const changeTodoHandler = (text: string) => {
    setTodo(text);
  };

  const todoErrorHandler = (errorMessage: string) => {
    setTodoError(errorMessage);
  };

  const updateTaskHandler = () => {
    if (todoError) return;
    setIsTaskUpdateClicked(true);
    updateTask(task.id, { todo });
  };

  return (
    <HStack
      justifyContent={"space-between"}
      spacing={10}
      border={"1px solid #E0E0E0"}
      p={4}
      borderRadius={4}
    >
      <HStack>
        {isTaskEditingMode ? (
          <GetUpdate
            onTodoChange={changeTodoHandler}
            onTodoError={todoErrorHandler}
            defaultTodo={task.todo}
          />
        ) : (
          <>
            <TaskCompletedCheckbox id={task.id} completed={task.completed} />
            <Text>{task.todo}</Text>
          </>
        )}
      </HStack>
      <HStack spacing={3}>
        {isTaskEditingMode ? (
          <>
            {isUpdating && isTaskUpdateClicked ? (
              <Loader size="extra-small" />
            ) : (
              <>
                <CheckMarkIcon
                  onClick={updateTaskHandler}
                  style={{ cursor: todoError ? "auto" : "pointer" }}
                  fill={todoError ? "#a6a6a6" : "#32a852"}
                  width={17}
                  height={17}
                />
                <CloseIcon
                  onClick={exitEditClickHandler}
                  style={{ cursor: "pointer" }}
                  fill="#787878"
                  width={16}
                  height={16}
                />
              </>
            )}
          </>
        ) : (
          <>
            <DeleteTask id={task.id} />
            <EditIcon
              onClick={editClickHandler}
              style={{ cursor: "pointer" }}
              fill="#787878"
              width={16}
              height={16}
            />
          </>
        )}
      </HStack>
    </HStack>
  );
};

export const TasksList = withSuspense(List, {
  fallback: <Loader />
});
