import { ICredentials } from "./credential.model";

export interface ILoginRequest extends ICredentials {}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}
