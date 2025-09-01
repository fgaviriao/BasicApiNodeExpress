import * as yup from "yup";
import { ValidationFactory } from "./validation.factory";
import { CredentialResetPasswordDto } from "../dtos/CredentialResetPasswordDto";
export const credentialResetSchema: yup.Schema<CredentialResetPasswordDto> =
  yup.object({
    email: ValidationFactory.getEmailRules(),
    token: yup.string().required("El token es requerido"),
    password: ValidationFactory.getPasswordRules(),
    confirmPassword: yup
      .string()
      .required("La confirmación de contraseña es requerida")
      .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
  });
