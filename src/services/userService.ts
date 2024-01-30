import { PrismaClient, type User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { HttpError } from '@/utils/classes'

const prisma = new PrismaClient()

type TFindUser = (
  email: string,
  password: string,
  callback: (
    error: Error | unknown,
    data?: Omit<User, 'password'> & { password: undefined }
  ) => void
) => Promise<void>

export const findUser: TFindUser = async (email, password, callback) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (!user) throw new HttpError('User not found', 404)

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) throw new HttpError('Password incorrect', 400)

    callback(null, { ...user, password: undefined })
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TCreateUser = (
  name: string,
  email: string,
  password: string,
  callback: (error: Error | unknown, data?: Omit<User, 'password'>) => void
) => Promise<void>

export const createUser: TCreateUser = async (name, email, password, callback) => {
  try {
    const userExists = await prisma.user.count({
      where: {
        email
      }
    })

    if (userExists) throw new HttpError('Email already exists', 400)

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

    if (!user) throw new HttpError('Error while creating user', 500)

    callback(null, user)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TUserExists = (id: number) => Promise<boolean>

export const userExists: TUserExists = async id => {
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
