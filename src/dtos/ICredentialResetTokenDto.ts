import { ICredentialResetToken } from "../domain/entities/ICredentialResetToken";
export interface ICredentialResetTokenDto
  extends Omit<ICredentialResetToken, "token" | "usedAt"> {}
