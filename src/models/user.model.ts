import { IEditRequest, IFindRequest } from "./common.model";
import { ICredentials } from "./credential.model";

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface ICredentialsState {
  isActive: boolean;
  isLocked: boolean;
}

export interface IUserEntity extends IUser, ICredentials, ICredentialsState {
  Id: string | null;
  CcreatedAt: Date;
  UpdatedAt: Date | null;
  DeletedAt: Date | null;
}

export interface IUserCredentialsEntity extends ICredentials {
  id: string;
}

export interface IUserResponse extends IUser, ICredentialsState {
  id: string;
  username?: string;
}

export interface ICreateUserRequest extends IUser, ICredentials {
  confirmPassword: string;
}

export interface IEditUserRequest
  extends IUser,
    IEditRequest,
    ICredentialsState {
  id: string;
  username: string;
}

export interface IEditUserActiveStateRequest extends IEditRequest {
  isActive: boolean;
}

export interface IEditUserLockedStateRequest extends IEditRequest {
  isLocked: boolean;
}

export interface IFindUsersByCriteriaRequest extends IFindRequest {
  userName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface IFindUserByUsernameRequest {
  username: string;
}

export interface IFindUserByEmailRequest {
  email: string;
}

export interface IFindUserByIdRequest {
  id: string;
}
