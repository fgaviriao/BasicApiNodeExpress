import { ICredentialResetToken } from "../entities/ICredentialResetToken";

export interface ICredentialRepository {
  createResetPasswordToken(entity: ICredentialResetToken): Promise<boolean>;
  setNewPassword(email: string, newPassword: string): Promise<boolean>;
  setPaswordTokenUsed(email: string, token: string): Promise<boolean>;
  findResetPasswordToken(
    email: string,
    token: string
  ): Promise<ICredentialResetToken | undefined>;
}
