import { Request, Response } from "express";
import { CredentialRepository } from "../repositories/credential.repository";
import { CredentialService } from "../services/credential.service";
import { ICredentialResetToken } from "../domain/entities/ICredentialResetToken";
import { commonSchemaFactory } from "../validations/common.schema.factory";
import { Mapper } from "../utils/mapper.utils";
import { CredentialRequestPasswordResetResponseDto } from "../dtos/CredentialRequestPasswordResetResponseDto";
import { CommonResponseDto } from "../dtos/CommonResponseDto";
import { CredentialResetPasswordDto } from "../dtos/CredentialResetPasswordDto";
import { credentialResetSchema } from "../validations/credential.resetPassword";
import { UserService } from "../services/user.service";
import { UserRespository } from "../repositories/UserRepository";

export async function requestPasswordReset(req: Request, res: Response) {
  /*
#swagger.summary = 'Solicitud de restablecimiento de contraseña'
#swagger.descriptcion = 'Endpooint para solicitar restablecimiento de contraseña a partir del correo electrónico asociado al usuario.'
#swagger.tags = ['Credenciales']
#swagger.consumes = ['application/json']
#swagger.produces = ['application/json']
#swagger.parameters['body'] = {
            in: 'body',
            description: 'request',
            schema: { $ref: '#/definitions/CredentialRequestPasswordResetDto' }
}
  #swagger.responses[200] = {
    description: 'Solicitud de restablecimiento de contraseña exitosa',
    schema: { 
      $ref: "#/definitions/CredentialRequestPasswordResetResponseDto"}
  }
  #swagger.responses[400] = { 
    description: 'Errores de validación', 
    schema: {$ref: '#/definitions/validationsErrors'}
  } 
   #swagger.responses[404] = { 
    description: 'Correo no registrado', 
    schema: {$ref: "#/definitions/defaultResponse"}}
  } 
 */

  try {
    await commonSchemaFactory.emailSchema.validate(req.body, {
      abortEarly: false,
    });
    const userService = new UserService(new UserRespository());
    const user = await userService.findByEmail(req.body.email);
    if (!user) {
      return res
        .status(404)
        .json(new CommonResponseDto("Correo no registrado"));
    }

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

    const response: CredentialRequestPasswordResetResponseDto =
      Mapper.mapObject(
        resetPasswordEntry,
        new CredentialRequestPasswordResetResponseDto()
      );

    res.status(200).json(response);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ errors: error.errors });
    }

    return res
      .status(500)
      .json(new CommonResponseDto("Error interno del servidor"));
  }
}

export async function resetPassword(req: Request, res: Response) {
  /*
  #swagger.summary = 'Restablecer contraseña'
  #swagger.description = 'Endpoint para restablecer la contraseña utilizando un token válido.'
  #swagger.tags = ['Credenciales']
  #swagger.consumes = ['application/json']
  #swagger.produces = ['application/json']
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'request',
    schema: { $ref: '#/definitions/CredentialRequestPasswordResetDto' }
  }
  #swagger.responses[200] = {
    description: 'Contraseña actualizada correctamente',
    schema: { 
      $ref: "#/definitions/defaultResponse"}
  }
  #swagger.responses[400] = { 
    description: 'Errores de validación', 
    schema: {$ref: '#/definitions/validationsErrors'}
  }
  #swagger.responses[404] = { 
    description: 'Solicitud no encontrada', 
    schema: {$ref: '#/definitions/validationsErrors'}
  }
   */
  try {
    await credentialResetSchema.validate(req.body, { abortEarly: false });
    const resetRequest: CredentialResetPasswordDto = req.body;
    const service = new CredentialService(new CredentialRepository());
    const row = await service.findResetPasswordToken(
      resetRequest.email,
      resetRequest.token
    );

    if (!row) {
      return res
        .status(404)
        .json(
          new CommonResponseDto(
            "Solicitud de restablecimiento no encontrada o inválida"
          )
        );
    }

    if (new Date() > row.expireAt) {
      return res.status(400).json({ errors: ["El token ha expirado"] });
    }

    if (row.usedAt) {
      return res
        .status(400)
        .json({ errors: ["El token ya ha sido utilizado"] });
    }

    if (resetRequest.password !== resetRequest.confirmPassword) {
      return res.status(400).json({ errors: ["Las contraseñas no coinciden"] });
    }

    await service.setNewPassword(resetRequest.email, resetRequest.password);

    await service.setPaswordTokenUsed(resetRequest.email, resetRequest.token);

    return res
      .status(200)
      .json(new CommonResponseDto("Contraseña actualizada correctamente"));
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    return res
      .status(500)
      .json(new CommonResponseDto("Error al restablecer la contraseña"));
  }
}
