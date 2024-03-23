import { environmentSchema } from "./environment.schema";

export function validateEnv() {
  environmentSchema.validateSync(process.env);
}
