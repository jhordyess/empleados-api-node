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
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email must be a valid email')
    .normalizeEmail()
    .escape(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isString()
    .withMessage('Password must be a valid string')
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
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email must be a valid email')
    .normalizeEmail()
    .escape(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isString()
    .withMessage('Password must be a valid string')
    .escape(),
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .bail()
    .isString()
    .withMessage('Name must be a valid string')
    .escape()
]
