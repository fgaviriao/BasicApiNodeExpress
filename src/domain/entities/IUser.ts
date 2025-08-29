export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface IUserState {
  isActive: boolean;
  isLocked: boolean;
}

export interface IUserCreate extends Omit<IUser, "id"> {}
export interface IUserCreateEntity extends IUserState, IUserCreate {}

export interface IUserEdit extends Omit<IUser, "password" | "username"> {}
