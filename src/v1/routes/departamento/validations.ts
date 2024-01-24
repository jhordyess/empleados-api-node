import { body, param, query } from 'express-validator'

export type listarDptoReq = {
  query: {
    page?: number
    limit?: number
    sort?: string
    search?: string
  }
}

export const listarDptoCheck = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('page debe ser un número entero mayor a 0')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('limit debe ser un número entero mayor a 0')
    .toInt(),
  query('sort')
    .optional()
    .isIn(['nombre', 'descripcion'])
    .withMessage('sort debe ser nombre o descripcion')
    .escape(),
  query('search')
    .optional()
    .notEmpty()
    .withMessage('search no debe estar vacío')
    .isString()
    .withMessage('search debe ser una cadena')
    .escape()
]

export type obtenerDptoReq = {
  params: {
    dptoId: number
  }
}

export const obtenerDptoCheck = param('dptoId')
  .notEmpty()
  .withMessage('Departamento es requerido') //* INFO if dptoId is empty the route not match and the request is not validated.
  .isInt({ min: 1 })
  .withMessage('Departamento debe ser un número entero mayor a 0')
  .toInt()

export type crearDptoReq = {
  body: {
    nombre: string
    descripcion?: string
  }
}

export const crearDptoCheck = [
  body('nombre')
    .notEmpty()
    .withMessage('Nombre es requerido')
    .bail() //* INFO required!, not stop as the docs say (possible bug only for 'body' function)
    .isString()
    .withMessage('Nombre debe ser una cadena')
    .escape(),
  body('descripcion').optional().isString().withMessage('Descripción debe ser una cadena').escape()
]

export type modificarDptoReq = {
  params: {
    dptoId: number
  }
  body: {
    nombre: string
    descripcion?: string
  }
}

export const modificarDptoCheck = [
  param('dptoId')
    .notEmpty()
    .withMessage('Departamento es requerido') //*INFO if dptoId is empty the route not match and the request is not validated
    .isInt({ min: 1 })
    .withMessage('Departamento debe ser un número entero mayor a 0')
    .toInt(),
  body('nombre')
    .notEmpty()
    .withMessage('Nombre es requerido')
    .bail() //* INFO required!, not stop as the docs say (possible bug only for 'body' function)
    .isString()
    .withMessage('Nombre debe ser una cadena')
    .escape(),
  body('descripcion').optional().isString().withMessage('Descripción debe ser una cadena').escape()
]
