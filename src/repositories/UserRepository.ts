import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUsersCriteria } from "../domain/entities/IUserCriteria";
import { User } from "../domain/entities/User";
import { getConnection } from "../config/db";
import { IUserCreateEntity, IUserEdit } from "../domain/entities/IUser";

export class UserRespository implements IUserRepository {
  public refreshTokens: string[] = [];
  private readonly SQL_SEARCHED_FIELDS = `Id
      ,Username as username
      ,PasswordHash as password
      ,Email as email
      ,FirstName as firstName
      ,LastName as lastName
      ,IsActive as isActive
      ,IsLocked as isLocked
      `;

  async create(user: IUserCreateEntity): Promise<User> {
    const SQL_INSERT_USER = `INSERT INTO Users (Username, PasswordHash, email, FirstName, lastName,IsActive, IsLocked, CreatedDate) 
  OUTPUT INSERTED.Id VALUES (@username, @passwordHash, @email, @firstName, @lastName, 1, 0, GETDATE())`;
    const pool = await getConnection();
    try {
      const result = await pool
        .request()
        .input("username", user.username)
        .input("passwordHash", user.password)
        .input("email", user.email)
        .input("firstName", user.firstName)
        .input("lastName", user.lastName)
        .query(SQL_INSERT_USER);
      const response: User = {
        ...user,
        id: result.recordset[0].id,
        isActive: true,
        isLocked: false,
      } as User;
      return response;
    } catch (error) {
      console.error("Error inserting user:", error);
      throw error;
    }
  }
  async edit(user: IUserEdit): Promise<User | undefined> {
    const SQL_UPDDATE_USER = `UPDATE Users 
                              SET email = @email,
                                  FirstName = @firstName,
                                  lastName = @lastName
                              WHERE Id = @rowId`;
    const pool = await getConnection();
    await pool
      .request()
      .input("firstName", user.firstName)
      .input("lastName", user.lastName)
      .input("email", user.email)
      .input("rowId", user.id)
      .query(SQL_UPDDATE_USER);
    return user as User;
  }
  async editActiveState(id: string, isActive: boolean): Promise<boolean> {
    const SQL = `UPDATE Users SET IsActive = @isActive WHERE Id = @rowId`;

    const pool = await getConnection();
    const result = await pool
      .request()
      .input("rowId", id)
      .input("isActive", isActive)
      .query(SQL);

    return !result.rowsAffected ? false : true;
  }

  async editLockedState(id: string, isLocked: boolean): Promise<boolean> {
    const SQL = `UPDATE Users SET IsLocked = @isLocked WHERE Id = @rowId`;
    const pool = await getConnection();
    const result = await pool
      .request()

      .input("rowId", id)
      .input("isLocked", isLocked)
      .query(SQL);

    return !result.rowsAffected ? false : true;
  }
  async find(): Promise<User[] | undefined> {
    const SQL = `SELECT ${this.SQL_SEARCHED_FIELDS} FROM Users`;
    const pool = await getConnection();
    const result = await pool.request().query<User>(SQL);
    return result.recordset;
  }

  async findById(id: string): Promise<User | undefined> {
    const SQL = `SELECT ${this.SQL_SEARCHED_FIELDS} FROM Users WHERE Id = @rowId`;
    const pool = await getConnection();
    const result = await pool.request().input("rowId", id).query(SQL);

    const row = result.recordset[0];

    if (!row) return undefined;

    return row as User;
  }
  async findByUsername(username: string): Promise<User | undefined> {
    const SQL = `SELECT ${this.SQL_SEARCHED_FIELDS} FROM Users WHERE Username = @username`;
    const pool = await getConnection();
    const result = await pool.request().input("username", username).query(SQL);

    const row = result.recordset[0];

    if (!row) return undefined;

    return row as User;
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const SQL = `SELECT ${this.SQL_SEARCHED_FIELDS} FROM Users WHERE email = @email`;
    const pool = await getConnection();
    const result = await pool.request().input("email", email).query(SQL);

    const row = result.recordset[0];

    if (!row) return undefined;

    return row as User;
  }
  async findByCriteria(criteria: IUsersCriteria): Promise<User[]> {
    const pool = await getConnection();
    const request = pool.request();

    const SQL = `SELECT ${this.SQL_SEARCHED_FIELDS}
    FROM Users 
    WHERE (@userName IS NULL OR Username LIKE @userName)
    AND (@email IS NULL OR Email LIKE @email)
    AND (@firstName IS NULL OR FirstName LIKE @firstName)
    AND (@lastName IS NULL OR LastName LIKE @lastName)
    OFFSET @skip ROWS
    FETCH NEXT @limit ROWS ONLY
    `;

    const result = await request
      .input("username", criteria.userName ? `%${criteria.userName}%` : null)
      .input("email", criteria.email ? `%${criteria.email}%` : null)
      .input("firstName", criteria.firstName ? `%${criteria.firstName}%` : null)
      .input("lastName", criteria.lastName ? `%${criteria.lastName}%` : null)
      .input("skip", criteria.skip)
      .input("limit", criteria.limit)
      .query(SQL);

    return result.recordset;
  }
}
