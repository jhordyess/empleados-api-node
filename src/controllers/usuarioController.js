import jwt from 'jsonwebtoken'
import { HttpError } from '../utils/classes.js'
import { createUser, findUser } from '../services/usuarioService.js'

const SECRET = process.env.JWT_SECRET

export const login = async (req, res, next) => {
  try {
    if (!SECRET) throw new HttpError('No secret provided', 500, false)

    const { email, password } = req.body

    await findUser(email, password, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Usuario no encontrado', 500, false)

      const token = jwt.sign(data.id, SECRET)

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

export const register = async (req, res, next) => {
  try {
    if (!SECRET) throw new HttpError('No secret provided', 500, false)

    const { name, email, password } = req.body

    await createUser(name, email, password, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Usuario no encontrado', 500, false)

      const token = jwt.sign(data.id, SECRET)

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
