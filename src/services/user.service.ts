import { IUserCreateEntity, IUserEdit } from "../domain/entities/IUser";
import { User } from "../domain/entities/User";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUserCreateDto } from "../dtos/IUserCreateDto";
import { IUsersCriteria } from "../domain/entities/IUserCriteria";
import { BcryptUtil } from "../utils/bcript.util";
import { UserDto } from "../dtos/UserDto";
import { Mapper } from "../utils/mapper.utils";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(user: IUserCreateDto): Promise<UserDto> {
    const hashedPassword = await BcryptUtil.hashPassword(user.password);
    const userEntity: IUserCreateEntity = {
      ...user,
      isActive: true,
      isLocked: false,
      password: hashedPassword,
    } as IUserCreateEntity;

    const userCreated = await this.userRepository.create(userEntity);
    return Mapper.mapObject(userCreated, new UserDto({}));
  }

  async editUser(user: IUserEdit): Promise<UserDto | undefined> {
    const userFound = await this.userRepository.edit(user);
    if (!userFound) return undefined;
    return Mapper.mapObject(userFound, new UserDto({}));
  }

  async setActiveState(id: string, isActive: boolean): Promise<boolean> {
    return await this.userRepository.editActiveState(id, isActive);
  }

  async setLockedState(id: string, isLocked: boolean): Promise<boolean> {
    return await this.userRepository.editLockedState(id, isLocked);
  }

  async findUsers(): Promise<UserDto[] | undefined> {
    const users = await this.userRepository.find();
    if (!users) return undefined;
    return Mapper.mapArray(users, UserDto);
  }

  async findById(id: string): Promise<UserDto | undefined> {
    const user = await this.userRepository.findById(id);
    if (!user) return undefined;
    return Mapper.mapObject(user, new UserDto({}));
  }

  async findByUsername(username: string): Promise<UserDto | undefined> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) return undefined;
    return Mapper.mapObject(user, new UserDto({}));
  }

  async findByCriteria(criteria: IUsersCriteria): Promise<UserDto[]> {
    const users = await this.userRepository.findByCriteria(criteria);
    if (!users) return new Array<UserDto>();
    return Mapper.mapArray(users, UserDto);
  }
}
