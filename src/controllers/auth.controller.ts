import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { JwtPayload } from "../utils/jwt.util";
import { UserRespository } from "../repositories/UserRepository";
import { AuthLoginDto } from "../dtos/AuthLoginDto";
import { authLoginSchema } from "../validations/auth.login.schema";
import { authRefreshTokenSchema } from "../validations/auth.refreshtoken.schema";
import { AuthRefreshTokenDto } from "../dtos/AuthRefreshTokenDto";

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
          $ref: "#/definitions/AuthLoginDto"
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: 'Inicio de sesión exitoso',
    schema: { $ref: '#/definitions/AuthLoginResponseDto' }
  }
  #swagger.responses[401] = { description: 'Credenciales inválidas' }
  */
  try {
    await authLoginSchema.validate(req.body, { abortEarly: false });
    const auth: AuthLoginDto = req.body;
    const service = new AuthService(new UserRespository());
    const jwtAcces = await service.login(auth.username, auth.password);
    if (!jwtAcces)
      return res
        .status(401)
        .json({ message: "Usuario no encontrado o contraseña incorrecta" });

    res.json(jwtAcces);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
export async function refreshToken(req: Request, res: Response) {
  /*
  #swagger.summary = 'Refrescar token'
  #swagger.description = 'Endpoint para refrescar el token de acceso utilizando un token de actualización.'
  #swagger.tags = ['Autenticación']
  #swagger.requestBody  = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/AuthRefreshTokenDto"
        }
      }
    }
  }
  #swagger.responses[200] = {
      description: 'Token de acceso refrescado',
      schema: { $ref: '#/definitions/AuthRefreshTokenResponseDto' }
  }
  #swagger.responses[401] = { description: 'Refresh Token no proporcionado' }
  #swagger.responses[403] = { description: 'Token inválido' }
  */
  try {
    await authRefreshTokenSchema.validate(req.body, { abortEarly: false });
    const authReq: AuthRefreshTokenDto = req.body;
    const service = new AuthService(new UserRespository());

    if (!service.isRefreshTokenValid(authReq.refreshToken))
      return res.sendStatus(403).json({ message: "Token inválido" });

    const { id, username } = JwtPayload.verifyRefreshToken(
      authReq.refreshToken
    );

    const accessToken = JwtPayload.generateAccessToken(id, username);
    res.json({ accessToken });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}
