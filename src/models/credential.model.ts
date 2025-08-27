export interface ICredentials {
  username: string;
  password: string;
}

export interface IResetPasswordEntity {
  email: string;
  token: string;
  createdAt: Date;
  expireAt: Date;
  usedAt: Date | null;
}

export interface IResetPasswordRequest {
  email: string;
}

export interface IResetPasswordResponse {
  email: string;
  createdAt: Date;
  expireAt: Date;
}

export interface IResetPasswordUsedEntity {
  email: string;
  token: string;
}

export interface IUpdatePasswordEntity {
  email: string;
  password: string;
}

export interface IUpdatePasswordRequest {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}

export interface IFindValidResetPasswordEntity {
  email: string;
  token: string;
}
