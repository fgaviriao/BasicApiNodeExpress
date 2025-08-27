import bcrypt from "bcryptjs";
import { getConnection } from "../config/db";
import {
  ICreateUserRequest,
  IEditUserActiveStateRequest,
  IEditUserLockedStateRequest,
  IEditUserRequest,
  IFindUsersByCriteriaRequest,
  IUserCredentialsEntity,
  IUserResponse,
} from "../models/user.model";

const SQL_INSERT_USER = `INSERT INTO Users (Username, PasswordHash, email, FirstName, lastName) 
  OUTPUT INSERTED.UserId VALUES (@username, @passwordHash, @email, @firstName, @lastName)`;
const SQL_UPDDATE_USER = `UPDATE Users 
SET Username = @username, 
email = @email, 
FirstName = @firstName, 
lastName = @lastName 
WHERE Id = @rowId`;
const SQL_ACTIVE_STATE_USER = `UPDATE Users SET IsActive = @isActive WHERE Id = @rowId`;
const SQL_LOCKED_STATE_USER = `UPDATE Users SET IsLocked = @isLocked WHERE Id = @rowId`;
const SQL_FIND_BY_ID_USER = `SELECT * FROM Users WHERE Id = @rowId`;
const SQL_FIND_BY_USERNAME_USER = `SELECT Id, Username, PasswordHash FROM Users WHERE Username = @username`;
const SQL_FIND_BY_CRITERIA_USER = `SELECT * FROM Users WHERE Username = @username OR email = @email OR FirstName = @firstName OR lastName = @lastName`;

export async function findUsers(): Promise<IUserResponse[]> {
  const pool = await getConnection();
  const result = await pool.request().query("SELECT * FROM Users");
  return result.recordset;
}

export async function findUserByUsername(
  username: string
): Promise<IUserCredentialsEntity | undefined> {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("username", username)
    .query(SQL_FIND_BY_USERNAME_USER);

  const row = result.recordset[0];

  if (!row) return undefined;

  const user: IUserCredentialsEntity = {
    id: row.Id,
    username: row.Username,
    password: row.PasswordHash,
  };

  return user;
}

export async function findUserById(
  id: string
): Promise<IUserResponse | undefined> {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("rowId", id)
    .query(SQL_FIND_BY_ID_USER);

  const row = result.recordset[0];
  console.log(id);
  if (!row) return undefined;

  const user: IUserResponse = {
    id: row.Id,
    email: row.Email,
    firstName: row.FirstName,
    lastName: row.LastName,
    isActive: row.IsActive,
    isLocked: row.IsLocked,
  };

  return user;
}

export async function findUserByCriteria(
  req: IFindUsersByCriteriaRequest
): Promise<IUserResponse[]> {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("username", req.userName)
    .input("email", req.email)
    .input("firstName", req.firstName)
    .input("lastName", req.lastName)
    .query(SQL_FIND_BY_CRITERIA_USER);
  return result.recordset;
}

export async function createUser(
  req: ICreateUserRequest
): Promise<IUserResponse> {
  const hashedPassword = await bcrypt.hash(req.password, 10);
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("username", req.username)
    .input("passwordHash", hashedPassword)
    .input("email", req.email)
    .input("firstName", req.firstName)
    .input("lastName", req.lastName)
    .query(SQL_INSERT_USER);

  const user: IUserResponse = {
    id: result.recordset[0].Id as string,
    email: req.email,
    firstName: req.firstName,
    lastName: req.lastName,
    isActive: true,
    isLocked: false,
  };

  return user;
}

export async function editUser(req: IEditUserRequest): Promise<IUserResponse> {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("username", req.username)
    .input("firstName", req.firstName)
    .input("lastName", req.lastName)
    .input("email", req.email)
    .input("rowId", req.id)
    .query(SQL_UPDDATE_USER);

  const user: IUserResponse = {
    id: req.id,
    username: req.username,
    email: req.email,
    firstName: req.firstName,
    lastName: req.lastName,
    isActive: req.isActive,
    isLocked: req.isLocked,
  };
  return user;
}

export async function editUserActiveState(
  req: IEditUserActiveStateRequest
): Promise<boolean> {
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("rowId", req.id)
    .input("isActive", req.isActive)
    .query(SQL_ACTIVE_STATE_USER);

  if (!result.rowsAffected) return false;

  return true;
}

export async function editUserLockedState(
  req: IEditUserLockedStateRequest
): Promise<boolean> {
  const pool = await getConnection();
  const result = await pool
    .request()

    .input("rowId", req.id)
    .input("isLocked", req.isLocked)
    .query(SQL_LOCKED_STATE_USER);

  if (!result.rowsAffected) return false;

  return true;
}

export const refreshTokens: string[] = [];
