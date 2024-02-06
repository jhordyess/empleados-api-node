import { body, param, query } from 'express-validator'

export type listDeptReq = {
  query: {
    page?: number
    limit?: number
    sort?: 'name' | 'description'
    search?: string
  }
}

export const listDeptCheck = [
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
    .isIn(['name', 'description'])
    .withMessage('sort must be name or description')
    .escape(),
  query('search')
    .optional()
    .notEmpty()
    .withMessage('search must not be empty')
    .isString()
    .withMessage('search must be a string')
    .escape()
]

export type getDeptReq = {
  params: {
    deptId: number
  }
}

export const getDeptCheck = param('deptId')
  .notEmpty()
  .withMessage('Department is required') //* INFO if deptId is empty the route not match and the request is not validated.
  .isInt({ min: 1 })
  .withMessage('Department must be a number greater than 0')
  .toInt()

export type createDeptReq = {
  body: {
    name: string
    description?: string
  }
}

export const createDeptCheck = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .bail() //* INFO required!, not stop as the docs say (possible bug only for 'body' function)
    .isString()
    .withMessage('Name must be a string')
    .escape(),
  body('description').optional().isString().withMessage('Description must be a string').escape()
]

export type updateDeptReq = {
  params: {
    deptId: number
  }
  body: {
    name: string
    description?: string
  }
}

export const updateDeptCheck = [
  param('deptId')
    .notEmpty()
    .withMessage('Department is required') //*INFO if deptId is empty the route not match and the request is not validated
    .isInt({ min: 1 })
    .withMessage('Department must be a number greater than 0')
    .toInt(),
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .bail() //* INFO required!, not stop as the docs say (possible bug only for 'body' function)
    .isString()
    .withMessage('Name must be a string')
    .escape(),
  body('description').optional().isString().withMessage('Description must be a string').escape()
]
