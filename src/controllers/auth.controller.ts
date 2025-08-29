import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { JwtPayload } from "../utils/jwt.util";
import { UserRespository } from "../repositories/UserRepository";

export class AuthController {
  constructor() {}
  async login(req: Request, res: Response) {
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
    const service = new AuthService(new UserRespository());
    const jwtAcces = await service.login(username, password);
    if (!jwtAcces)
      return res
        .status(401)
        .json({ message: "Usuario no encontrado o contraseña incorrecta" });

    res.json(jwtAcces);
  }
  async refreshToken(req: Request, res: Response) {
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
    const service = new AuthService(new UserRespository());
    if (!service.isRefreshTokenValid(token)) return res.sendStatus(403);

    try {
      const { id, username } = JwtPayload.verifyRefreshToken(token);
      const accessToken = JwtPayload.generateAccessToken(id, username);
      res.json({ accessToken });
    } catch {
      res.sendStatus(403);
    }
  }
}
