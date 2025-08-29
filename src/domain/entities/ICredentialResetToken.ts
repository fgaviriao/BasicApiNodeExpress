export interface ICredentialResetToken {
  email: string;
  token: string;
  createdAt: Date;
  expireAt: Date;
  usedAt: Date | null;
}
