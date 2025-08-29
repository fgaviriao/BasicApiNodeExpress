import { getConnection } from "../config/db";
import { ICredentialRepository } from "../domain/repositories/ICredentialRepository";
import { ICredentialResetToken } from "../domain/entities/ICredentialResetToken";

export class CredentialRepository implements ICredentialRepository {
  async createResetPasswordToken(
    entity: ICredentialResetToken
  ): Promise<boolean> {
    try {
      const SQL = `INSERT INTO ResetPasswords (Email, Token, CreatedAt, ExpireAt) 
    VALUES (@email, @token, @createdAt, @expireAt)`;
      const pool = await getConnection();

      await pool
        .request()
        .input("email", entity.email)
        .input("token", entity.token)
        .input("createdAt", entity.createdAt)
        .input("expireAt", entity.expireAt)
        .query(SQL);
      return true;
    } catch (error) {
      console.log("createResetPasswordToken:", error);
      return false;
    }
  }
  async setNewPassword(email: string, newPassword: string): Promise<boolean> {
    const pool = await getConnection();
    const SQL = `UPDATE Users SET PasswordHash = @passwordHash WHERE Email = @email`;
    try {
      await pool
        .request()
        .input("passwordHash", newPassword)
        .input("email", email)
        .query(SQL);
      return true;
    } catch (error) {
      console.log("setNewPassword:", error);
      return false;
    }
  }
  async setPaswordTokenUsed(email: string, token: string): Promise<boolean> {
    const SQL = `UPDATE ResetPasswords SET UsedAt = @usedAt WHERE Email = @email AND Token = @token`;
    try {
      const pool = await getConnection();
      await pool
        .request()
        .input("email", email)
        .input("token", token)
        .input("usedAt", new Date())
        .query(SQL);
      return true;
    } catch (error) {
      console.log("setNewPassword:", error);
      return false;
    }
  }
  async findResetPasswordToken(
    email: string,
    token: string
  ): Promise<ICredentialResetToken | undefined> {
    const SQL = `SELECT * FROM ResetPasswords WHERE Email = @email AND Token = @token`;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("email", email)
      .input("token", token)
      .query(SQL);

    const row = result.recordset[0];

    if (!row) return undefined;

    const resetPasswordEntry: ICredentialResetToken = {
      email: row.Email,
      token: row.Token,
      createdAt: row.CreatedAt,
      expireAt: row.ExpireAt,
      usedAt: row.UsedAt,
    };

    return resetPasswordEntry;
  }
}
