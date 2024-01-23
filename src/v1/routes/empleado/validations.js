import { body, param, query } from 'express-validator'

export const listarEmpleadosCheck = [
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
    .isIn(['nombre', 'apellidoPaterno', 'apellidoMaterno', 'fechaNacimiento', 'nombreDpto'])
    .withMessage(
      'sort debe ser nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento o nombreDpto'
    )
    .escape(),
  query('search')
    .optional()
    .notEmpty()
    .withMessage('search no debe estar vacío')
    .isString()
    .withMessage('search debe ser una cadena')
    .escape(),
  query('dptoId') //TODO can be enhanced to a 'filter' object
    .optional()
    .isInt({ min: 1 })
    .withMessage('dptoId debe ser un número entero mayor a 0')
    .toInt()
]

export const obtenerEmpleadoCheck = param('empleadoId')
  .notEmpty()
  .withMessage('Empleado es requerido')
  .isInt({ min: 1 })
  .withMessage('Empleado debe ser un número entero mayor a 0')
  .toInt()

export const crearEmpleadoCheck = [
  body('nombre')
    .notEmpty()
    .withMessage('Nombre es requerido')
    .bail()
    .isString()
    .withMessage('Nombre debe ser una cadena')
    .escape(),
  body('apellidoPaterno')
    .notEmpty()
    .withMessage('Apellido paterno es requerido')
    .bail()
    .isString()
    .withMessage('Apellido paterno debe ser una cadena')
    .escape(),
  body('apellidoMaterno')
    .notEmpty()
    .withMessage('Apellido materno es requerido')
    .bail()
    .isString()
    .withMessage('Apellido materno debe ser una cadena')
    .escape(),
  body('fechaNacimiento')
    .notEmpty()
    .withMessage('Fecha de nacimiento es requerido')
    .bail()
    .isDate()
    .withMessage('Fecha de nacimiento debe ser una fecha')
    .toDate(),
  body('direccion').optional().isString().withMessage('Dirección debe ser una cadena').escape(),
  body('telefono').optional().isString().withMessage('Teléfono debe ser una cadena').escape(),
  body('dptoId')
    .notEmpty()
    .withMessage('Departamento es requerido')
    .isInt({ min: 1 })
    .withMessage('Departamento debe ser un número entero mayor a 0')
    .toInt()
]

export const modificarEmpleadoCheck = [
  param('empleadoId')
    .notEmpty()
    .withMessage('Empleado es requerido')
    .isInt({ min: 1 })
    .withMessage('Empleado debe ser un número entero mayor a 0')
    .toInt(),
  body('nombre')
    .notEmpty()
    .withMessage('Nombre es requerido')
    .bail()
    .isString()
    .withMessage('Nombre debe ser una cadena')
    .escape(),
  body('apellidoPaterno')
    .notEmpty()
    .withMessage('Apellido paterno es requerido')
    .bail()
    .isString()
    .withMessage('Apellido paterno debe ser una cadena')
    .escape(),
  body('apellidoMaterno')
    .notEmpty()
    .withMessage('Apellido materno es requerido')
    .bail()
    .isString()
    .withMessage('Apellido materno debe ser una cadena')
    .escape(),
  body('fechaNacimiento')
    .notEmpty()
    .withMessage('Fecha de nacimiento es requerido')
    .bail()
    .isDate()
    .withMessage('Fecha de nacimiento debe ser una fecha')
    .toDate(),
  body('direccion').optional().isString().withMessage('Dirección debe ser una cadena').escape(),
  body('telefono').optional().isString().withMessage('Teléfono debe ser una cadena').escape(),
  body('dptoId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Departamento debe ser un número entero mayor a 0')
    .toInt()
]
