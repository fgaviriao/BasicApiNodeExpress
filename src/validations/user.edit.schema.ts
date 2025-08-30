import * as yup from "yup";
import { IUserEdit } from "../domain/entities/IUser";
import { ValidationFactory } from "./validation.factory";
export const userEditSchema: yup.Schema<IUserEdit> = yup.object({
  id: ValidationFactory.getIdRules(),
  email: ValidationFactory.getEmailRules(),
  firstName: yup.string().required("El nombre es requerido"),
  lastName: yup.string().required("El apellido es requerido"),
});
