import { Request, Response } from "express";
import * as credentialModels from "../models/credential.model";
import { CredentialRepository } from "../repositories/credential.repository";
import {
  IResetPasswordEntity,
  IResetPasswordResponse,
  IResetPasswordUsedEntity,
  IUpdatePasswordEntity,
  IUpdatePasswordRequest,
} from "../models/credential.model";

export async function requestPasswordReset(req: Request, res: Response) {
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
  const reqData: credentialModels.IResetPasswordRequest = req.body;
  const token = Math.random().toString(36).substring(2); // Generar un token simple
  const now = new Date();
  const expireAt = new Date(now.getTime() + 3600000); // Expira en 1 hora
  const resetPasswordEntry: credentialModels.IResetPasswordEntity = {
    email: reqData.email,
    token: token,
    createdAt: now,
    expireAt: expireAt,
    usedAt: null,
  };

  try {
    await CredentialRepository.createResetPasswordEntry(resetPasswordEntry);

    //TODO: enviar el correo electrónico con el token
    console.log(`TODO:Enviar correo a ${reqData.email} con el token ${token}`);

    const response: IResetPasswordResponse = {
      email: resetPasswordEntry.email,
      createdAt: resetPasswordEntry.createdAt,
      expireAt: resetPasswordEntry.expireAt,
    };

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

export async function resetPassword(req: Request, res: Response) {
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
    const resetRequest: IUpdatePasswordRequest = req.body;
    const row = await CredentialRepository.findValidResetPasswordEntry(
      resetRequest
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
      return res.status(400).json({ message: "El token ya ha sido utilizado" });
    }

    if (resetRequest.password !== resetRequest.confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }
    const updatePaswordEntity: IUpdatePasswordEntity = {
      email: resetRequest.email,
      password: resetRequest.password,
    };
    await CredentialRepository.updatePasswordByEmail(updatePaswordEntity);

    const markUsedRequest: IResetPasswordUsedEntity = {
      email: resetRequest.email,
      token: resetRequest.token,
    };
    await CredentialRepository.markResetPasswordAsUsed(markUsedRequest);

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
