import * as yup from "yup";
import { ValidationFactory } from "./validation.factory";
export class commonSchemaFactory {
  static idSchema: yup.Schema<{ id: string }> = yup.object({
    id: ValidationFactory.getIdRules(),
  });
  static emailSchema: yup.Schema<{ email: string }> = yup.object({
    email: ValidationFactory.getEmailRules(),
  });
}
