import { IUserCreateDto } from "./IUserCreateDto";

export class UserCreateDto implements IUserCreateDto {
  constructor(
    public username: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public password: string,
    public confirmPassword: string
  ) {}
}
