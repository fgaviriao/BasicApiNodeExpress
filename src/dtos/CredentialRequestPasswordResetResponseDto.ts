export class CredentialRequestPasswordResetResponseDto {
  email: string = "";
  createdAt: Date = new Date();
  expireAt: Date = new Date();
}
