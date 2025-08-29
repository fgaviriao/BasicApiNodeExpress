import jwt from "jsonwebtoken";
import { config } from "../config/env";
const ACCESS_TOKEN_SECRET = config.accessTokenSecret;
const REFRESH_TOKEN_SECRET = config.refreshTokenSecret;

export class JwtPayload {
  static generateAccessToken(userId: string, username: string): string {
    return jwt.sign({ id: userId, username: username }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
  }
  static generateRefreshToken(userId: string, username: string): string {
    return jwt.sign({ id: userId, username: username }, REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
  }
  static verifyAccessToken(token: string): any {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  }
  static verifyRefreshToken(token: string): any {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  }
}
