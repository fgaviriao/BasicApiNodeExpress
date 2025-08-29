import { IUser } from "../models/user.model";

export class UserDto implements IUser {
  id: string = "";
  username: string = "";
  email: string = "";
  firstName: string = "";
  lastName: string = "";
  isActive: boolean = false;
  isLocked: boolean = false;

  constructor(data: Partial<UserDto>) {
    Object.assign(this, data);
  }
  static fromDomain(user: IUser): UserDto {
    return new UserDto({ ...user });
  }
}
