import { Progress as ChakraProgress } from "@chakra-ui/react";
import { taskStore } from "@/entities/task";

export const Progress = () => {
  const { tasks } = taskStore.useTaskStore((state) => ({
    tasks: state.tasks
  }));

  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const progress = Math.ceil((completed / total) * 100);

  return (
    <ChakraProgress
      colorScheme={"blue"}
      w={"100%"}
      hasStripe
      isAnimated
      value={progress}
    />
  );
};
