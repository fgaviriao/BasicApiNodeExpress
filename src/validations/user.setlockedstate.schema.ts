import * as yup from "yup";
import { ValidationFactory } from "./validation.factory";
export const userSetLockedStateSchema: yup.Schema<{
  id: string;
  isLocked: boolean;
}> = yup.object({
  id: ValidationFactory.getIdRules(),
  isLocked: yup.boolean().required("El estado activo es requerido"),
});
