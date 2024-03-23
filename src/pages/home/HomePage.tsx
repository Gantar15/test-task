import { Stack } from "@chakra-ui/react";
import { TasksList } from "@/widgets/tasks-list";
import { TasksPanel } from "@/widgets/tasks-panel";

export const HomePage = () => {
  return (
    <>
      <Stack maxWidth={"900px"} w={"100%"}>
        <TasksPanel />
        <TasksList />
      </Stack>
    </>
  );
};
