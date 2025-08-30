import * as yup from "yup";
import { ValidationFactory } from "./validation.factory";
export const findByIdSchema: yup.Schema<{ id: string }> = yup.object({
  id: ValidationFactory.getIdRules(),
});
