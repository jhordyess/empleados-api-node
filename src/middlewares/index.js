import { checkRequest } from './requestValidator.js'
import { checkToken } from './auth.js'

export const withAuth = handler => [checkToken, handler]

export const withValidation = (validation, handler) => [validation, checkRequest, handler]

export const withAuthAndValidation = (validation, handler) => [
  checkToken,
  validation,
  checkRequest,
  handler
]
