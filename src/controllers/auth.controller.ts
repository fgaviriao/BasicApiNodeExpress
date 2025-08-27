import { Request, Response } from "express";
import { validateUser } from "../services/auth.service";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.util";
import { refreshTokens } from "../repositories/user.repository";

export async function login(req: Request, res: Response) {
  /*
  #swagger.summary = 'Iniciar sesión'
  #swagger.description = 'Endpoint para que los usuarios inicien sesión y obtengan tokens de acceso y actualización.'
  #swagger.tags = ['Autenticación']
  #swagger.consumes = ['application/json']
  #swagger.produces = ['application/json']
  #swagger.requestBody  = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/LoginRequest"
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: 'Inicio de sesión exitoso',
    schema: { $ref: '#/definitions/LoginResponse' }
  }
  #swagger.responses[401] = { description: 'Credenciales inválidas' }
  */
  const { username, password } = req.body;
  const user = await validateUser(username, password);
  if (!user)
    return res
      .status(401)
      .json({ message: "Usuario no encontrado o contraseña incorrecta" });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
}

export function refreshToken(req: Request, res: Response) {
  /*
  #swagger.summary = 'Refrescar token'
  #swagger.description = 'Endpoint para refrescar el token de acceso utilizando un token de actualización.'
  #swagger.tags = ['Autenticación']
  #swagger.parameters['token'] = {
      in: 'body',
      description: 'Token de actualización',
      required: true,
      schema: { $ref: '#/definitions/RefreshTokenRequest' }
  }   
  #swagger.responses[200] = {
      description: 'Token de acceso refrescado',
      schema: { $ref: '#/definitions/RefreshTokenResponse' }
  }
  #swagger.responses[401] = { description: 'Token no proporcionado' }
  #swagger.responses[403] = { description: 'Token inválido' }
  */
  const { token } = req.body;
  if (!token) return res.sendStatus(401);
  if (!refreshTokens.includes(token)) return res.sendStatus(403);

  try {
    const user = verifyRefreshToken(token);
    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch {
    res.sendStatus(403);
  }
}

export function protectedRoute(req: Request, res: Response) {
  res.json({ message: "Acceso autorizado", user: (req as any).user });
}
