import { Request, Response } from "express";
import { UserRespository } from "../repositories/UserRepository";
import { UserService } from "../services/user.service";
import { IUserCreateDto } from "../dtos/IUserCreateDto";
import { IUserEdit } from "../domain/entities/IUser";
import { IUserEditStateDto } from "../dtos/IUserEditStateDto";
import { IUsersCriteria } from "../domain/entities/IUserCriteria";
import { userCreateSchema } from "../validations/user.create.schema";
import { userEditSchema } from "../validations/user.edit.schema";
import { userSetActiveStateSchema } from "../validations/user.setactivestate.schema";
import { userSetLockedStateSchema } from "../validations/user.setlockedstate.schema";
import { findByIdSchema } from "../validations/common.findbyid.schema";

export async function createUser(req: Request, res: Response) {
  /*
  #swagger.summary = 'Crear usuario'
  #swagger.description = 'Endpoint para crear un nuevo usuario en el sistema.'
  #swagger.tags = ['Usuarios']
  #swagger.security = [{
            "bearerAuth": []
    }] 
  #swagger.consumes = ['application/json']
  #swagger.produces = ['application/json']
  #swagger.requestBody  = {
    required: true,
    content: {  
      "application/json": {
        schema: {  $ref: "#/definitions/UserCreateDto"  }
      }
    }
  }
  #swagger.responses[201] = {
    description: 'Usuario creado exitosamente',
    schema: { $ref:"#/definitions/UserDto" }
  }
  #swagger.responses[400] = { description: 'Error al crear el usuario' }
  */

  try {
    await userCreateSchema.validate(req.body, { abortEarly: false });
    const userReq: IUserCreateDto = req.body;
    const service = new UserService(new UserRespository());
    const user = await service.createUser(userReq);

    if (!user) {
      return res.status(400).json({ message: "Error al crear el usuario" });
    }
    res.status(201).json({ message: "Usuario creado", user });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function editUser(req: Request, res: Response) {
  /*
  #swagger.summary = 'Editar usuario'
  #swagger.description = 'Endpoint para editar la información de un usuario existente.'
  #swagger.tags = ['Usuarios']
  #swagger.security = [{
            "bearerAuth": []
    }]
  #swagger.consumes = ['application/json']
  #swagger.produces = ['application/json']
  #swagger.requestBody  = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/EditUserRequest"
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: 'Usuario editado exitosamente',
    schema: { message: "Usuario editado" }
  }
  #swagger.responses[400] = { description: 'Error al editar el usuario' }
  */
  try {
    await userEditSchema.validate(req.body, { abortEarly: false });
    const userReq: IUserEdit = req.body;
    const service = new UserService(new UserRespository());
    const user = await service.editUser(userReq);
    if (!user) {
      return res.status(400).json({ message: "Error al editar el usuario" });
    }
    return res.status(200).json({ message: "Usuario editado" });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function editUserActiveState(req: Request, res: Response) {
  /*
  #swagger.summary = 'Cambiar estado activo del usuario'
  #swagger.description = 'Endpoint para cambiar el estado activo de un usuario.'
  #swagger.tags = ['Usuarios']
  #swagger.security = [{
            "bearerAuth": []
    }]
  #swagger.consumes = ['application/json']
  #swagger.produces = ['application/json']
  #swagger.requestBody  = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/EditUserActiveStateRequest"
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: 'Estado del usuario cambiado exitosamente',
    schema: { message: "Estado del usuario cambiado" }
  }
  #swagger.responses[400] = { description: 'Error al cambiar el estado del usuario' }
  */
  try {
    await userSetActiveStateSchema.validate(req.body, { abortEarly: false });
    const { id, state } = req.body as IUserEditStateDto;
    const service = new UserService(new UserRespository());
    const user = await service.setActiveState(id, state);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Error al cambiar el estado del usuario" });
    }
    return res.status(200).json({ message: "Estado del usuario cambiado" });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function editUserLockedState(req: Request, res: Response) {
  /*
  #swagger.summary = 'Cambiar estado bloqueado del usuario'
  #swagger.description = 'Endpoint para cambiar el estado bloqueado de un usuario.'
  #swagger.tags = ['Usuarios']
  #swagger.security = [{
            "bearerAuth": []
    }]
  #swagger.consumes = ['application/json']
  #swagger.produces = ['application/json']
  #swagger.requestBody  = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/EditUserLockedStateRequest"
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: 'Estado del usuario cambiado exitosamente',
    schema: { message: "Estado del usuario cambiado" }
  }
  #swagger.responses[400] = { description: 'Error al cambiar el estado del usuario' }
  */
  try {
    await userSetLockedStateSchema.validate(req.body, { abortEarly: false });
    const { id, state } = req.body as IUserEditStateDto;
    const service = new UserService(new UserRespository());
    const user = await service.setLockedState(id, state);
    if (!user) {
      return res
        .status(400)
        .json({ message: "Error al cambiar el estado del usuario" });
    }
    return res.status(200).json({ message: "Estado del usuario cambiado" });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function findUsers(req: Request, res: Response) {
  /*
  #swagger.summary = 'Consulta todos los usuarios'
  #swagger.description = 'Endpoint para obtener una lista de todos los usuarios registrados en el sistema.'
  #swagger.tags = ['Usuarios']
  #swagger.security = [{
            "bearerAuth": []
    }]
  #swagger.responses[200] = {
      description: 'usuarios obtenidos',
      schema: { $ref: '#/definitions/Users' }
} */
  res.setHeader("Content-Type", "application/json");
  const service = new UserService(new UserRespository());
  const users = await service.findUsers();
  res.status(200).json(users);
}

export async function findUserByUsername(req: Request, res: Response) {
  /*
  #swagger.summary = 'Consulta usuario por nombre de usuario'
  #swagger.description = 'Endpoint para obtener un usuario por su nombre de usuario.'
  #swagger.tags = ['Usuarios']
  #swagger.security = [{
            "bearerAuth": []
    }]
  #swagger.parameters['username'] = {
      in: 'path',
      description: 'Nombre de usuario del usuario a buscar',
      required: true,
      type: 'string'
  }
  #swagger.responses[200] = {
      description: 'Usuario obtenido',
      schema: { $ref: '#/definitions/User' }
  }
  #swagger.responses[404] = { description: 'Usuario no encontrado' }
  */
  try {
    const username = req.params.username as string;
    const service = new UserService(new UserRespository());
    const users = await service.findByUsername(username);
    res.status(200).json(users);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

export async function findUserById(req: Request, res: Response) {
  /*
  #swagger.summary = 'Consulta usuario por ID'
  #swagger.description = 'Endpoint para obtener un usuario por su ID.'
  #swagger.tags = ['Usuarios']
  #swagger.security = [{
            "bearerAuth": []
    }]
  #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del usuario a buscar',
      required: true,
      type: 'string'
  }
  #swagger.responses[200] = {
      description: 'Usuario obtenido',
      schema: { $ref: '#/definitions/User' }
  }
  #swagger.responses[404] = { description: 'Usuario no encontrado' }
  */
  await findByIdSchema.validate(req.params, { abortEarly: false });
  const id = req.params.id as string;
  const service = new UserService(new UserRespository());
  const users = await service.findById(id);
  res.status(200).json(users);
}

export async function findUserByCriteria(req: Request, res: Response) {
  /*
  #swagger.summary = 'Consulta usuarios por criterios'
  #swagger.description = 'Endpoint para obtener una lista de usuarios que cumplan con los criterios especificados.'
  #swagger.tags = ['Usuarios']
  #swagger.security = [{
            "bearerAuth": []
    }]
  #swagger.consumes = ['application/json']
  #swagger.produces = ['application/json']
  #swagger.requestBody  = {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/definitions/FindUsersByCriteriaRequest"
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: 'Usuarios obtenidos',
    schema: { $ref: '#/definitions/Users' }
  }
  #swagger.responses[400] = { description: 'Error en la consulta' }
  */
  const userCriteria: IUsersCriteria = req.body;
  const service = new UserService(new UserRespository());
  const users = await service.findByCriteria(userCriteria);
  res.status(200).json(users);
}
