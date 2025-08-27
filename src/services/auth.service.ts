import { findUserByUsername } from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import { ITokenCredentials } from "../models/token.model";

export async function validateUser(
  username: string,
  password: string
): Promise<ITokenCredentials | null> {
  const user = await findUserByUsername(username);
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password);
  return valid ? user : null;
}
