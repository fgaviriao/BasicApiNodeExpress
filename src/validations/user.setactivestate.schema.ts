import * as yup from "yup";
import { ValidationFactory } from "./validation.factory";
export const userSetActiveStateSchema: yup.Schema<{
  id: string;
  isActive: boolean;
}> = yup.object({
  id: ValidationFactory.getIdRules(),
  isActive: yup.boolean().required("El estado activo es requerido"),
});
