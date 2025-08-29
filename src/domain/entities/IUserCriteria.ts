import { IFindRequest } from "./ICommon";
export interface IUsersCriteria extends IFindRequest {
  userName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}
