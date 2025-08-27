import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { ITokenCredentials } from "../models/token.model";
const ACCESS_TOKEN_SECRET = config.accessTokenSecret;
const REFRESH_TOKEN_SECRET = config.refreshTokenSecret;

export function generateAccessToken(credential: ITokenCredentials): string {
  return jwt.sign(
    { id: credential.id, username: credential.username },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
}

export function generateRefreshToken(credential: ITokenCredentials): string {
  return jwt.sign(
    { id: credential.id, username: credential.username },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyAccessToken(token: string): any {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

export function verifyRefreshToken(token: string): any {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}
