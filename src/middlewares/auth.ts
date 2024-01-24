import jwt from 'jsonwebtoken'
import type { RequestHandler } from 'express'
import { HttpError } from '@/utils/classes'
import { userExists } from '@/services/usuarioService'

const SECRET = process.env.JWT_SECRET

export const checkToken: RequestHandler = async (req, _, next) => {
  try {
    if (!SECRET) throw new HttpError('No secret provided', 500, false)

    const { authorization } = req.headers

    if (!authorization) throw new HttpError('No estas autenticado', 401)

    const token = authorization.split(' ')[1]

    if (!token) throw new HttpError('No estas autenticado', 401)

    const id = jwt.verify(token, SECRET)

    const exists = await userExists(Number(id))

    if (!exists) throw new HttpError('No estas autorizado', 401)

    // TODO req.userId = id

    next()
  } catch (error) {
    next(error)
  }
}
