import * as yup from "yup";

export const TaskResponseSchema = yup.object().shape({
  id: yup.number().required(),
  todo: yup.string().required(),
  completed: yup.boolean().required(),
  userId: yup.number().required(),
});
