import { body, param, query } from 'express-validator'

export type listEmployeeReq = {
  query: {
    page?: number
    limit?: number
    sort?: string
    search?: string
    deptId?: number
  }
}

export const listEmployeeCheck = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('page must be a number greater than 0')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('limit must be a number greater than 0')
    .toInt(),
  query('sort')
    .optional()
    .isIn(['name', 'lastName', 'birthDate', 'deptName'])
    .withMessage('sort must be name, lastName, birthDate or deptName')
    .escape(),
  query('search')
    .optional()
    .notEmpty()
    .withMessage('search must not be empty')
    .isString()
    .withMessage('search must be a string')
    .escape(),
  query('deptId') //TODO can be enhanced to a 'filter' object
    .optional()
    .isInt({ min: 1 })
    .withMessage('deptId must be a number greater than 0')
    .toInt()
]

export type getEmployeeReq = {
  params: {
    employeeId: number
  }
}

export const getEmployeeCheck = param('employeeId')
  .notEmpty()
  .withMessage('employee id is required')
  .isInt({ min: 1 })
  .withMessage('employee id must be a number greater than 0')
  .toInt()

export type createEmployeeReq = {
  body: {
    name: string
    lastName: string
    birthDate: Date
    address?: string
    phone?: string
    deptId: number
  }
}

export const createEmployeeCheck = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .bail()
    .isString()
    .withMessage('Name must be a valid string')
    .escape(),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .bail()
    .isString()
    .withMessage('Last name must be a valid string')
    .escape(),
  body('birthDate')
    .notEmpty()
    .withMessage('Birth date is required')
    .bail()
    .isDate()
    .withMessage('Birth date must be a valid date')
    .toDate(),
  body('address').optional().isString().withMessage('Address must be a valid string').escape(),
  body('phone').optional().isString().withMessage('Phone must be a valid string').escape(),
  body('deptId')
    .notEmpty()
    .withMessage('Department is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Department must be a number greater than 0')
    .toInt()
]

export type updateEmployeeReq = {
  params: {
    employeeId: number
  }
  body: {
    name: string
    lastName: string
    birthDate: Date
    address?: string
    phone?: string
    deptId: number
  }
}

export const updateEmployeeCheck = [
  param('employeeId')
    .notEmpty()
    .withMessage('Employee id is required')
    .isInt({ min: 1 })
    .withMessage('Employee id must be a number greater than 0')
    .toInt(),
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .bail()
    .isString()
    .withMessage('Name must be a valid string')
    .escape(),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .bail()
    .isString()
    .withMessage('Last name must be a valid string')
    .escape(),
  body('birthDate')
    .notEmpty()
    .withMessage('Birth date is required')
    .bail()
    .isDate()
    .withMessage('Birth date must be a valid date')
    .toDate(),
  body('address').optional().isString().withMessage('Address must be a valid string').escape(),
  body('phone').optional().isString().withMessage('Phone must be a valid string').escape(),
  body('deptId')
    .notEmpty()
    .withMessage('Department is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Department must be a number greater than 0')
    .toInt()
]
