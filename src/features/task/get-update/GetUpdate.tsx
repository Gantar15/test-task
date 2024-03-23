import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  Stack
} from "@chakra-ui/react";

import { UpdateTaskSchema } from "@/entities/task/task.schema";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface GetUpdateProps {
  onTodoChange?: (text: string) => void;
  onTodoError?: (errorMessage: string | null) => void;
  defaultTodo?: string;
}
export const GetUpdate = ({
  onTodoChange,
  onTodoError,
  defaultTodo
}: GetUpdateProps) => {
  const { register, formState, watch } = useForm({
    resolver: yupResolver(UpdateTaskSchema),
    defaultValues: {
      todo: defaultTodo
    },
    mode: "onChange"
  });
  const { errors } = formState;

  useEffect(() => {
    onTodoChange?.(watch("todo"));
  }, [watch("todo")]);

  useEffect(() => {
    if (errors.todo) onTodoError?.(errors.todo.message);
    else onTodoError?.(null);
  }, [errors.todo]);

  return (
    <FormControl isInvalid={!!errors.todo}>
      <Stack spacing={5}>
        <div>
          <Input
            name="todo"
            {...register("todo")}
            placeholder="Write some task"
            size="md"
          />
          {!errors.todo ? (
            <FormHelperText>
              Enter new task todo you would like to complete.
            </FormHelperText>
          ) : (
            <FormErrorMessage>{errors.todo?.message}</FormErrorMessage>
          )}
        </div>
      </Stack>
    </FormControl>
  );
};
