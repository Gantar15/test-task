import * as yup from "yup";

export const environmentSchema = yup.object().shape({
  API_URL: yup.string().required(),
});
