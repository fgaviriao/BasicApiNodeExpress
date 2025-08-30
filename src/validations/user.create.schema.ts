import * as yup from "yup";
import { IUserCreateDto } from "../dtos/IUserCreateDto";
import { ValidationFactory } from "./validation.factory";
export const userCreateSchema: yup.Schema<IUserCreateDto> = yup.object({
  username: ValidationFactory.getUsernameRules(),
  email: ValidationFactory.getEmailRules(),
  password: ValidationFactory.getPasswordRules(),
  confirmPassword: yup
    .string()
    .required("La confirmación de contraseña es requerida")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
  firstName: yup.string().required("El nombre es requerido"),
  lastName: yup.string().required("El apellido es requerido"),
});
