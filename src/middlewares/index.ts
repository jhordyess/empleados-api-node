import type { RequestHandler, Request, NextFunction, Response } from 'express'
import { checkRequest } from './requestValidator'
import { checkToken } from './auth'
import { ValidationChain } from 'express-validator'

type TValidation = ValidationChain | ValidationChain[]

export const withAuth = (handler: RequestHandler) => [checkToken, handler]

export const withValidation = <R>(
  validation: TValidation,
  handler: (req: Request & R, res: Response, next: NextFunction) => void
) => [validation, checkRequest, handler]

export const withAuthAndValidation = <R>(
  validation: TValidation,
  handler: (req: Request & R, res: Response, next: NextFunction) => void
) => [checkToken, validation, checkRequest, handler]
