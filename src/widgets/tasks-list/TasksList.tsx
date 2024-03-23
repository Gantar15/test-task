import { DeleteTask, TaskCompletedCheckbox } from "@/features/task";
import { HStack, Stack, Text } from "@chakra-ui/react";
import { taskStore, taskType } from "@/entities/task";

import EditIcon from "@/shared/assets/icons/edit.svg";
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
  const editClickHandler = () => {};

  return (
    <HStack
      justifyContent={"space-between"}
      spacing={10}
      border={"1px solid #E0E0E0"}
      p={4}
      borderRadius={4}
    >
      <HStack>
        <TaskCompletedCheckbox id={task.id} completed={task.completed} />
        <Text>{task.todo}</Text>
      </HStack>
      <HStack spacing={3}>
        <DeleteTask id={task.id} />
        <EditIcon
          style={{ cursor: "pointer" }}
          fill="#787878"
          onClick={editClickHandler}
          width={16}
          height={16}
        />
      </HStack>
    </HStack>
  );
};

export const TasksList = withSuspense(List, {
  fallback: <Loader />
});
