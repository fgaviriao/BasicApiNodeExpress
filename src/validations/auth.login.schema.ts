import * as yup from "yup";
import { ValidationFactory } from "./validation.factory";
import { AuthLoginDto } from "../dtos/AuthLoginDto";
export const authLoginSchema: yup.Schema<AuthLoginDto> = yup.object({
  username: ValidationFactory.getUsernameRules(),
  password: ValidationFactory.getPasswordRules(),
});
