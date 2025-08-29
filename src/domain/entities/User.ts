import { IUser } from "./IUser";
export class User implements IUser {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public password: string,
    public isActive: boolean,
    public isLocked: boolean
  ) {}
}
