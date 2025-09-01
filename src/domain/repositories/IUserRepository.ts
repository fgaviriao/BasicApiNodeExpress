import { IUserCreateEntity, IUserEdit } from "../entities/IUser";
import { IUsersCriteria } from "../entities/IUserCriteria";
import { User } from "../entities/User";
export interface IUserRepository {
  refreshTokens: string[];
  create(user: IUserCreateEntity): Promise<User>;
  edit(user: IUserEdit): Promise<User | undefined>;
  editActiveState(id: string, isActive: boolean): Promise<boolean>;
  editLockedState(id: string, isLocked: boolean): Promise<boolean>;
  find(): Promise<User[] | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByUsername(username: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findByCriteria(criteria: IUsersCriteria): Promise<User[]>;
}
