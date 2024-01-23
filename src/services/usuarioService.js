import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { HttpError } from '../utils/classes.js'

const prisma = new PrismaClient()

export const findUser = async (email, password, callback) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) throw new HttpError('Usuario no encontrado', 404)

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) throw new HttpError('Contraseña incorrecta', 400)

    callback(null, { ...user, password: undefined })
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

export const createUser = async (name, email, password, callback) => {
  try {
    const userExists = await prisma.user.count({
      where: {
        email
      }
    })

    if (userExists) throw new HttpError('Email ya registrado', 400)

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    if (!user) throw new HttpError('Error al crear usuario', 500)

    callback(null, user)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

export const userExists = async id => {
  try {
    return !!(await prisma.user.findUnique({
      where: {
        id
      }
    }))
  } catch (error) {
    console.error(error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}
