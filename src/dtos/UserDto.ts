import { BaseModel } from "../domain/entities/BaseModel";
import { IUser } from "../domain/entities/IUser";

export class UserDto extends BaseModel implements Omit<IUser, "password"> {
  id: string = "";
  username: string = "";
  email: string = "";
  firstName: string = "";
  lastName: string = "";
  isActive: boolean = false;
  isLocked: boolean = false;

  constructor(data: Partial<UserDto>) {
    super();
    Object.assign(this, data);
  }
}
