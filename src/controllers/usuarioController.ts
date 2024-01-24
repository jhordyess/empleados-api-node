import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import { HttpError } from '@/utils/classes'
import { createUser, findUser } from '@/services/usuarioService'
import type { loginReq, registerReq } from '@/v1/routes/usuario/validations'

const SECRET = process.env.JWT_SECRET

export const login = async (req: Request & loginReq, res: Response, next: NextFunction) => {
  try {
    if (!SECRET) throw new HttpError('No secret provided', 500, false)

    //BUG email and password are 'any' although they are defined in loginReq (Same for all req.body in all controllers!)
    const { email, password } = req.body

    await findUser(email, password, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Usuario no encontrado', 500, false)

      const token = jwt.sign(String(data.id), SECRET)

      res.status(200).json({
        data: {
          ...data,
          token
        }
      })
    })
  } catch (error) {
    next(error)
  }
}

export const register = async (req: Request & registerReq, res: Response, next: NextFunction) => {
  try {
    if (!SECRET) throw new HttpError('No secret provided', 500, false)

    const { name, email, password } = req.body

    await createUser(name, email, password, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Usuario no encontrado', 500, false)

      const token = jwt.sign(String(data.id), SECRET)

      res.status(201).json({
        data: {
          ...data,
          token
        }
      })
    })
  } catch (error) {
    next(error)
  }
}
