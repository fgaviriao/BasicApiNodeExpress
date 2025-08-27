import { Request, Response } from "express";
import * as userModels from "../models/user.model";
import * as userRepository from "../repositories/user.repository";

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
        schema: {
          $ref: "#/definitions/CreateUserRequest"
        }
      }
    }
  }
  #swagger.responses[201] = {
    description: 'Usuario creado exitosamente',
    schema: { message: "Usuario creado" }
  }
  #swagger.responses[400] = { description: 'Error al crear el usuario' }
  */
  const userReq: userModels.ICreateUserRequest = req.body;
  const user = await userRepository.createUser(userReq);
  if (!user) {
    return res.status(400).json({ message: "Error al crear el usuario" });
  }
  res.status(201).json({ message: "Usuario creado" });
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
  const userReq: userModels.IEditUserRequest = req.body;
  const user = await userRepository.editUser(userReq);
  if (!user) {
    return res.status(400).json({ message: "Error al editar el usuario" });
  }
  return res.status(200).json({ message: "Usuario editado" });
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
  const userReq: userModels.IEditUserActiveStateRequest = req.body;
  const user = await userRepository.editUserActiveState(userReq);
  if (!user) {
    return res
      .status(400)
      .json({ message: "Error al cambiar el estado del usuario" });
  }
  return res.status(200).json({ message: "Estado del usuario cambiado" });
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
  const userReq = req.body;
  const user = await userRepository.editUserLockedState(userReq);
  if (!user) {
    return res
      .status(400)
      .json({ message: "Error al cambiar el estado del usuario" });
  }
  return res.status(200).json({ message: "Estado del usuario cambiado" });
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
  const users = await userRepository.findUsers();
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
  const username = req.params.username as string;
  const users = await userRepository.findUserByUsername(username);
  res.status(200).json(users);
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
  const id = req.params.id as string;
  const users = await userRepository.findUserById(id);
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
  const userCriteria: userModels.IFindUsersByCriteriaRequest = req.body;
  const users = await userRepository.findUserByCriteria(userCriteria);
  res.status(200).json(users);
}
