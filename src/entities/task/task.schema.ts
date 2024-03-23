import * as yup from "yup";

export const TaskResponseSchema = yup.object().shape({
  id: yup.number().required(),
  todo: yup.string().required(),
  completed: yup.boolean().required(),
  userId: yup.number().required()
});

export const CreateTaskSchema = yup.object().shape({
  todo: yup.string().required().min(5, "Too short. Minimum 5 symbols")
});

export const UpdateTaskSchema = yup.object().shape({
  todo: yup.string().required().min(5, "Too short. Minimum 5 symbols")
});
