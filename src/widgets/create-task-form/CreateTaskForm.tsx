import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack
} from "@chakra-ui/react";
import { taskStore, taskType } from "@/entities/task";
import { useEffect, useState } from "react";

import { CreateTaskSchema } from "@/entities/task/task.schema";
import { Loader } from "@/shared/ui/Loader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface CreateTaskFormProps {
  onSubmit?: () => void;
}
export const CreateTaskForm = ({ onSubmit }: CreateTaskFormProps) => {
  const { createTask, isTaskCreating } = taskStore.useTaskStore((state) => ({
    createTask: state.create,
    isTaskCreating: state.isTaskCreating
  }));
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateTaskSchema)
  });
  const [isTaskSubmitted, setIsTaskSubmitted] = useState(false);
  const { errors } = formState;

  useEffect(() => {
    if (!isTaskCreating && isTaskSubmitted) {
      onSubmit?.();
    }
  }, [isTaskCreating]);

  const submitHandler = (data: taskType.TaskCreate) => {
    setIsTaskSubmitted(true);
    createTask(data);
  };

  return (
    <FormControl isInvalid={!!errors.todo}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack spacing={5}>
          <div>
            <FormLabel>Todo</FormLabel>
            <Input
              name="todo"
              {...register("todo")}
              placeholder="Write some task"
              size="md"
            />
            {!errors.todo ? (
              <FormHelperText>
                Enter the task you would like to complete.
              </FormHelperText>
            ) : (
              <FormErrorMessage>{errors.todo?.message}</FormErrorMessage>
            )}
          </div>

          <Button type="submit">
            {isTaskCreating ? <Loader size="extra-small" /> : "Create"}
          </Button>
        </Stack>
      </form>
    </FormControl>
  );
};
