import { Box, Stack } from "@chakra-ui/react";

import { Progress } from "@/features/task";
import { TasksList } from "@/widgets/tasks-list";
import { TasksPanel } from "@/widgets/tasks-panel";

export const HomePage = () => {
  return (
    <>
      <Stack maxWidth={"900px"} w={"100%"}>
        <Box paddingBottom={"20px"}>
          <Progress />
        </Box>
        <TasksPanel />
        <TasksList />
      </Stack>
    </>
  );
};
