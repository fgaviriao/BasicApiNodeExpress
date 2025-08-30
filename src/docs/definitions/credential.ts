export const credential = {
  Credentials: {
    username: "johndoe",
    password: "password",
  },
  ResetPasswordRequest: {
    email: "correo@ejemplo.com",
  },
  ResetPasswordResponse: {
    email: "correo@ejemplo.com",
    createAt: "2024-01-01T00:00:00.000Z",
    expireAt: "2024-01-01T01:00:00.000Z",
  },
  UpdatePasswordRequest: {
    email: "correo@ejemplo.com",
    password: "password",
    confirmPassword: "password",
    token: "d1f1e1c1-1a1a-1b1b-1c1c-1d1d1e1e1f1f",
  },
  UpdatePasswordResponse: {
    message: "Contraseña actualizada correctamente",
  },
};
