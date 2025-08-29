import { IUserCreate } from "../domain/entities/IUser";

export interface IUserCreateDto extends IUserCreate {
  confirmPassword: string;
}
