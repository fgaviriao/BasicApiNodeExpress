export interface ICredentialResetPasswordDto {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}
