import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "../utils/jwt.util";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    const user = JwtPayload.verifyAccessToken(token);
    (req as any).user = user;
    next();
  } catch {
    return res.sendStatus(403);
  }
}
