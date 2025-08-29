import { IUserEdit } from "../domain/entities/IUser";

export class UserEditDto implements IUserEdit {
  constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string
  ) {}
}
