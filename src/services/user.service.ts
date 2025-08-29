import { IUserCreateEntity, IUserEdit } from "../domain/entities/IUser";
import { User } from "../domain/entities/User";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUserCreateDto } from "../dtos/IUserCreateDto";
import { IUsersCriteria } from "../domain/entities/IUserCriteria";
import { BcryptUtil } from "../utils/bcript.util";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(user: IUserCreateDto): Promise<User> {
    const hashedPassword = await BcryptUtil.hashPassword(user.password);
    const userEntity: IUserCreateEntity = {
      ...user,
      isActive: true,
      isLocked: false,
      password: hashedPassword,
    } as IUserCreateEntity;

    return this.userRepository.create(userEntity);
  }

  async editUser(user: IUserEdit): Promise<User | undefined> {
    return this.userRepository.edit(user);
  }

  async setActiveState(id: string, isActive: boolean): Promise<boolean> {
    return this.userRepository.editActiveState(id, isActive);
  }

  async setLockedState(id: string, isLocked: boolean): Promise<boolean> {
    return this.userRepository.editLockedState(id, isLocked);
  }

  async findUsers(): Promise<User[] | undefined> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userRepository.findById(id);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findByUsername(username);
  }

  async findByCriteria(criteria: IUsersCriteria): Promise<User[]> {
    return this.userRepository.findByCriteria(criteria);
  }
}
