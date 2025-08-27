import bcrypt from "bcryptjs";
import { getConnection } from "../config/db";
import {
  IFindValidResetPasswordEntity,
  IResetPasswordEntity,
  IResetPasswordUsedEntity,
  IUpdatePasswordEntity,
} from "../models/credential.model";

export class CredentialRepository {
  private static readonly SQL_UPDATE_PASSWORD = `UPDATE Users SET PasswordHash = @passwordHash WHERE Email = @email`;
  private static readonly SQL_INSERT_RESET_PASSWORD = `INSERT INTO ResetPasswords (Email, Token, CreatedAt, ExpireAt) 
    VALUES (@email, @token, @createdAt, @expireAt)`;
  private static readonly SQL_FIND_RESET_PASSWORD = `SELECT * FROM ResetPasswords WHERE Email = @email AND Token = @token`;
  private static readonly SQL_MARK_RESET_PASSWORD_AS_USED = `UPDATE ResetPasswords SET UsedAt = @usedAt WHERE Email = @email AND Token = @token`;

  public static async updatePasswordByEmail(
    entity: IUpdatePasswordEntity
  ): Promise<void> {
    const pool = await getConnection();
    const passwordHash = await bcrypt.hash(entity.password, 10);

    await pool
      .request()
      .input("passwordHash", passwordHash)
      .input("email", entity.email)
      .query(this.SQL_UPDATE_PASSWORD);
  }

  public static async createResetPasswordEntry(
    entity: IResetPasswordEntity
  ): Promise<void> {
    const pool = await getConnection();

    await pool
      .request()
      .input("email", entity.email)
      .input("token", entity.token)
      .input("createdAt", entity.createdAt)
      .input("expireAt", entity.expireAt)
      .query(this.SQL_INSERT_RESET_PASSWORD);
  }

  public static async findValidResetPasswordEntry(
    entity: IFindValidResetPasswordEntity
  ): Promise<IResetPasswordEntity | undefined> {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("email", entity.email)
      .input("token", entity.token)
      .query(this.SQL_FIND_RESET_PASSWORD);

    const row = result.recordset[0];

    if (!row) return undefined;

    const resetPasswordEntry: IResetPasswordEntity = {
      email: row.Email,
      token: row.Token,
      createdAt: row.CreatedAt,
      expireAt: row.ExpireAt,
      usedAt: row.UsedAt,
    };

    return resetPasswordEntry;
  }

  public static async markResetPasswordAsUsed(
    entity: IResetPasswordUsedEntity
  ): Promise<void> {
    const pool = await getConnection();
    await pool
      .request()
      .input("email", entity.email)
      .input("token", entity.token)
      .input("usedAt", new Date())
      .query(this.SQL_MARK_RESET_PASSWORD_AS_USED);
  }
}
