export const user = {
  UserDto: {
    id: 1,
    username: "johndoe",
    email: "correo@ejemplo.com",
    firstName: "John",
    lastName: "Doe",
    isActive: true,
    isLocked: true,
  },
  Users: [
    {
      id: 1,
      username: "johndoe",
      email: "correo@ejemplo.com",
      firstName: "John",
      lastName: "Doe",
      isActive: true,
      isLocked: true,
    },
  ],
  UserCreateDto: {
    username: "johndoe",
    email: "correo@ejemplo.com",
    firstName: "John",
    lastName: "Doe",
    password: "password",
    confirmPassword: "password",
  },
  EditUserRequest: {
    username: "johndoe",
    email: "correo@ejemplo.com",
    password: "password",
    firstName: "John",
    lastName: "Doe",
    isActive: true,
    isLocked: true,
  },
  EditUserActiveStateRequest: {
    id: 1,
    isActive: true,
  },
  EditUserLockedStateRequest: {
    id: 1,
    isLocked: true,
  },
};
