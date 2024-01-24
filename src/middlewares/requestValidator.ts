import { validationResult } from 'express-validator'
import type { RequestHandler } from 'express'
import { HttpError } from '@/utils/classes'

export const checkRequest: RequestHandler = (req, _, next) => {
  try {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      const messages = result.array().map(error => error.msg)
      throw new HttpError(messages.join(', '), 400)
    }
    next()
  } catch (error) {
    next(error)
  }
}
