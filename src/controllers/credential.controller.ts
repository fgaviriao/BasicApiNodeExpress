import { Request, Response } from "express";
import { CredentialRepository } from "../repositories/credential.repository";
import { CredentialService } from "../services/credential.service";
import { ICredentialResetToken } from "../domain/entities/ICredentialResetToken";
import { ICredentialResetTokenDto } from "../dtos/ICredentialResetTokenDto";
import { ICredentialResetPasswordDto } from "../dtos/ICredentialResetPasswordDto";

export class CredentialController {
  constructor() {}
  async requestPasswordReset(req: Request, res: Response) {
    /*
  #swagger.summary = 'Solicitar restablecimiento de contraseña'
  #swagger.description = 'Endpoint para solicitar un restablecimiento de contraseña. Se genera un token y se envía al correo electrónico proporcionado.'
  #swagger.tags = ['Credenciales']
  #swagger.consumes = ['application/json']
  #swagger.produces = ['application/json']
  #swagger.requestBody  = {
    required: true,
    content: {  
      "application/json": {
        schema: {
          $ref: "#/definitions/ResetPasswordRequest"
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: 'Solicitud de restablecimiento de contraseña exitosa',
    schema: { 
      $ref: "#/definitions/ResetPasswordResponse"}
  }
  #swagger.responses[400] = { description: 'Error en la solicitud de restablecimiento de contraseña' }
  */

    try {
      const { email } = req.body;
      const token = Math.random().toString(36).substring(2); // Generar un token simple
      const now = new Date();
      const expireAt = new Date(now.getTime() + 3600000); // Expira en 1 hora
      const resetPasswordEntry: ICredentialResetToken = {
        email: email,
        token: token,
        createdAt: now,
        expireAt: expireAt,
        usedAt: null,
      };

      const service = new CredentialService(new CredentialRepository());
      await service.createResetPasswordToken(resetPasswordEntry);

      //TODO: enviar el correo electrónico con el token
      console.log(`TODO:Enviar correo a ${email} con el token ${token}`);

      const response: ICredentialResetTokenDto = { ...resetPasswordEntry };

      res.status(200).json(response);
    } catch (error) {
      console.error(
        "Error al crear la entrada de restablecimiento de contraseña:",
        error
      );
      res.status(400).json({
        message: "Error en la solicitud de restablecimiento de contraseña",
      });
    }
  }

  async resetPassword(req: Request, res: Response) {
    /*
  #swagger.summary = 'Restablecer contraseña'
  #swagger.description = 'Endpoint para restablecer la contraseña utilizando un token válido.'
  #swagger.tags = ['Credenciales']
  #swagger.consumes = ['application/json']
  #swagger.produces = ['application/json']
  #swagger.requestBody  = {
    required: true,
    content: {  
      "application/json": {
        schema: {
          $ref: "#/definitions/UpdatePasswordRequest"
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: 'Contraseña actualizada correctamente',
    schema: { 
      $ref: "#/definitions/UpdatePasswordResponse"}
  }
  #swagger.responses[400] = { description: 'Error al restablecer la contraseña' }
  */
    try {
      const resetRequest: ICredentialResetPasswordDto = req.body;
      const service = new CredentialService(new CredentialRepository());
      const row = await service.findResetPasswordToken(
        resetRequest.email,
        resetRequest.token
      );

      if (!row) {
        return res.status(404).json({
          message: "Solicitud de restablecimiento no encontrada o inválida",
        });
      }

      if (new Date() > row.expireAt) {
        return res.status(400).json({ message: "El token ha expirado" });
      }

      if (row.usedAt) {
        return res
          .status(400)
          .json({ message: "El token ya ha sido utilizado" });
      }

      if (resetRequest.password !== resetRequest.confirmPassword) {
        return res
          .status(400)
          .json({ message: "Las contraseñas no coinciden" });
      }

      await service.setNewPassword(resetRequest.email, resetRequest.password);

      await service.setPaswordTokenUsed(resetRequest.email, resetRequest.token);

      return res
        .status(200)
        .json({ message: "Contraseña actualizada correctamente" });
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      return res
        .status(500)
        .json({ message: "Error al restablecer la contraseña" });
    }
  }
}
