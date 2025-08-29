import { IUserRepository } from "../domain/repositories/IUserRepository";
import { JwtAccess } from "../domain/entities/JwtAccess";
import { JwtPayload } from "../utils/jwt.util";
import { BcryptUtil } from "../utils/bcript.util";
export class AuthService {
  constructor(private userRepository: IUserRepository) {}
  async login(username: string, password: string): Promise<JwtAccess | null> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) return null;
    const valid = await BcryptUtil.comparePassword(password, user.password);
    const accessToken = JwtPayload.generateAccessToken(user.id, user.username);
    const refreshToken = JwtPayload.generateRefreshToken(
      user.id,
      user.username
    );
    return valid ? new JwtAccess(accessToken, refreshToken) : null;
  }

  createRefreshToken(token: string): void {
    (this.userRepository as any).refreshTokens.push(token);
  }
  isRefreshTokenValid(token: string): boolean {
    return (this.userRepository as any).refreshTokens.includes(token);
  }
}
