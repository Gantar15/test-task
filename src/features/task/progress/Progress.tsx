import { Progress as ChakraProgress, HStack, Text } from "@chakra-ui/react";

import { taskStore } from "@/entities/task";

export const Progress = () => {
  const { tasks } = taskStore.useTaskStore((state) => ({
    tasks: state.tasks
  }));

  const total = tasks.length || 1;
  const completed = tasks.filter((task) => task.completed)?.length;
  const progress = Math.ceil((completed / total) * 100);

  return (
    <HStack
      spacing={3}
      borderRadius={"md"}
      paddingX={4}
      paddingY={2}
      boxShadow={"0px 0px 11px 1px rgb(235,235,235)"}
    >
      <Text as={"b"} fontSize={16}>
        {progress}%
      </Text>
      <ChakraProgress
        colorScheme={"blue"}
        w={"100%"}
        hasStripe
        isAnimated
        value={progress}
      />
    </HStack>
  );
};
