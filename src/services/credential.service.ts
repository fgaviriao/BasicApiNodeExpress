import { ICredentialResetToken } from "../domain/entities/ICredentialResetToken";
import { ICredentialRepository } from "../domain/repositories/ICredentialRepository";
import bcrypt from "bcryptjs";

export class CredentialService {
  constructor(private credentialRespository: ICredentialRepository) {}
  async createResetPasswordToken(
    entity: ICredentialResetToken
  ): Promise<boolean> {
    return this.credentialRespository.createResetPasswordToken(entity);
  }
  async setNewPassword(email: string, newPassword: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.credentialRespository.setNewPassword(email, hashedPassword);
  }
  async setPaswordTokenUsed(email: string, token: string): Promise<boolean> {
    return this.credentialRespository.setPaswordTokenUsed(email, token);
  }
  async findResetPasswordToken(
    email: string,
    token: string
  ): Promise<ICredentialResetToken | undefined> {
    return this.credentialRespository.findResetPasswordToken(email, token);
  }
}
