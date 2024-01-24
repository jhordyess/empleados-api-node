import { body } from 'express-validator'

export type loginReq = {
  body: {
    email: string
    password: string
  }
}

export const loginCheck = [
  body('email')
    .notEmpty()
    .withMessage('Email es requerido')
    .bail()
    .isEmail()
    .withMessage('Email debe ser válido')
    .normalizeEmail()
    .escape(),
  body('password')
    .notEmpty()
    .withMessage('Password es requerido')
    .bail()
    .isString()
    .withMessage('Password debe ser una cadena')
    .escape()
]

export type registerReq = {
  body: {
    email: string
    password: string
    name: string
  }
}

export const registerCheck = [
  body('email')
    .notEmpty()
    .withMessage('Email es requerido')
    .bail()
    .isEmail()
    .withMessage('Email debe ser válido')
    .normalizeEmail()
    .escape(),
  body('password')
    .notEmpty()
    .withMessage('Password es requerido')
    .bail()
    .isString()
    .withMessage('Password debe ser una cadena')
    .escape(),
  body('name')
    .notEmpty()
    .withMessage('Nombre es requerido')
    .bail()
    .isString()
    .withMessage('Nombre debe ser una cadena')
    .escape()
]
