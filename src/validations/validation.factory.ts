import * as yup from "yup";
export class ValidationFactory {
  static getIdRules() {
    return yup
      .string()
      .required("El ID del usuario es requerido")
      .length(36, "id debe tener 36 caracteres");
  }
  static getEmailRules() {
    return yup
      .string()
      .required("El correo electrónico es requerido")
      .email("Debe ser un correo electrónico válido");
  }
  static getPasswordRules() {
    return yup
      .string()
      .required("La contraseña es requerida")
      .min(6, "La contraseña debe tener al menos 6 caracteres");
  }
  static getUsernameRules() {
    return yup
      .string()
      .required("El nombre de usuario es requerido")
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres");
  }
}
